import React, { Component } from 'react'

class HomePageGroup extends Component {
    


    constructor(props) {
        super(props);
        this.state = {
            names: [],
            joinMessage: '',
            randomNumbers: [],
            isLoaded: false,
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
            randomNumbers: [Math.floor(Math.random() * groupNames.length), Math.floor(Math.random() * groupNames.length), Math.floor(Math.random() * groupNames.length), Math.floor(Math.random() * groupNames.length), Math.floor(Math.random() * groupNames.length), Math.floor(Math.random() * groupNames.length)],
            isLoaded: true,
        })
    


    }

    render() {
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
                    document.getElementById(id).style = "background-color: grey; cursor:not-allowed";
                    this.setState({
                        joinMessage: res.Error,
                    })
                }
                else
                {
                    this.setState({
                        joinMessage: 'Join Successful',
                    })
                }
            } catch(e) {
                alert(e.toString());
                return
            }
        }

        // const handleRandomGroups = () => {
        //     return(
        //         <button>HELLO</button>
        //     )
        // }


        return(
            <div className="groups-div">
                {this.state.isLoaded ? 
                    <>
                        <span className="group-names">
                            {this.state.names[this.state.randomNumbers[0]].Name}
                            <button id={this.state.names[this.state.randomNumbers[0]]._id} className="hpg-group-button" onClick={() => handleClick(this.state.names[this.state.randomNumbers[0]]._id)}>Join Group</button>
                        </span>
                        <span className="group-names">
                            {this.state.names[this.state.randomNumbers[1]].Name}
                            <button id={this.state.names[this.state.randomNumbers[1]]._id} className="hpg-group-button" onClick={() => handleClick(this.state.names[this.state.randomNumbers[1]]._id)}>Join Group</button>
                        </span>
                        <span className="group-names">
                            {this.state.names[this.state.randomNumbers[2]].Name}
                            <button id={this.state.names[this.state.randomNumbers[2]]._id} className="hpg-group-button" onClick={() => handleClick(this.state.names[this.state.randomNumbers[2]]._id)}>Join Group</button>
                        </span>
                        <span className="group-names">
                            {this.state.names[this.state.randomNumbers[3]].Name}
                            <button id={this.state.names[this.state.randomNumbers[3]]._id} className="hpg-group-button" onClick={() => handleClick(this.state.names[this.state.randomNumbers[3]]._id)}>Join Group</button>
                        </span>
                        <span className="group-names">
                            {this.state.names[this.state.randomNumbers[4]].Name}
                            <button id={this.state.names[this.state.randomNumbers[4]]._id} className="hpg-group-button" onClick={() => handleClick(this.state.names[this.state.randomNumbers[4]]._id)}>Join Group</button>
                        </span>
                        <span className="group-names">
                            {this.state.names[this.state.randomNumbers[5]].Name}
                            <button id={this.state.names[this.state.randomNumbers[5]]._id} className="hpg-group-button" onClick={() => handleClick(this.state.names[this.state.randomNumbers[5]]._id)}>Join Group</button>
                        </span>   
                    </>


                : null
            }


                {/* {this.state.names.slice(0,6).map((group, index) => (
                    <span key={index} className="group-names">
                        {handleRandomGroups()}
                        {group.Name}
                        <button id={group._id} className="hpg-group-button" onClick={() => handleClick(group._id)}>Join Group</button>
                    </span>
                    
                    ))} */}
                <span id="joinResult" className="join-error2">{this.state.joinMessage}</span>
            </div>
        );
    }
}

export default HomePageGroup; 

                {/* {this.state.names.slice(0,6).map((group, index) => (
                    <span key={index} className="group-names">
                        {group.Name}
                        <button id={group._id} className="hpg-group-button" onClick={() => handleClick(group._id)}>Join Group</button>
                    </span>
                    
                    ))} */}