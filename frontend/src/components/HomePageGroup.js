import React, { Component } from 'react'

class HomePageGroup extends Component {
    


    constructor(props) {
        super(props);
        this.state = {
            names: [],
        }
    }

    async componentWillMount() {
        const app_name = 'hivemindg26';
        function buildPath(route)
        {
            if (process.env.NODE_ENV === 'production') 
            {
                return 'https://' + app_name +  '.herokuapp.com/' + route;
            }
            else
            {        
                return 'http://localhost:5000/' + route;
            }
        }

        var obj = {flag:0, userID:0};        
        var js = JSON.stringify(obj);  
        const response = await fetch(buildPath('api/readGroup'), {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
        var res = JSON.parse(await response.text());
        var groupNames = [];
        groupNames = res.Results;
        this.setState({
            names: groupNames,
        })

    }

    render() {
        console.log(this.state.names);
        
        this.state.names.map((group, index) => (
            console.log(group.Name)
        ))

        var _ud = localStorage.getItem('user_data');
        var ud = JSON.parse(_ud);
        var uid = ud.ID;

        const handleClick = async (id) => {
            const app_name = 'hivemindg26';
            function buildPath(route)
            {
                if (process.env.NODE_ENV === 'production') 
                {
                    return 'https://' + app_name +  '.herokuapp.com/' + route;
                }
                else
                {        
                    return 'http://localhost:5000/' + route;
                }
            }
            var obj = {userID:uid,groupID:id};
            var js = JSON.stringify(obj);
            try {
                const response = await fetch(buildPath('api/joinGroup'), {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});    
                var res = JSON.parse(await response.text());
    
                if (res.Error === "User is already in this group")
                {
                    alert(res.Error);
                }
            } catch(e) {
                alert(e.toString());
                return
            }
        }

        return(
            <div className="groups-div">
                {this.state.names.slice(0,6).map((group, index) => (
                    <span className="group-names">
                        {group.Name}
                        <button id={group._id} className="hpg-group-button" onClick={() => handleClick(group._id)}>Join Group</button>
                    </span>
                    
                    ))}
            </div>
        );
    }
}

export default HomePageGroup; 