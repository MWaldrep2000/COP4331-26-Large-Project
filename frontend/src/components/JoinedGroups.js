import React, { Component, useState } from 'react';
import SideBarIssues from './SideBarIssues';

class JoinedGroups extends Component {
    
    // var searchFor;
    // var _ud = localStorage.getItem('user_data');
    // var ud = JSON.parse(_ud);
    // var id = ud.ID;
    // var email = ud.Email;
    // var searchResults;
    // const [message, setMessage] = useState('');
    // const [groupList,setGroupList] = useState('');

    constructor(props) {
        super(props);

        this.state = {
            names: [],
            issues: ["-Issues-"],
            groupNames: "Select a Group",
            groupID: 0,
            message: '',
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

        var _ud = localStorage.getItem('user_data');
        var ud = JSON.parse(_ud);
        var obj = {flag:1, userID:ud.ID};        
        var js = JSON.stringify(obj);  
        const response = await fetch(buildPath('api/readGroup'), {method:'POST',body:js,headers:{'Content-Type': 'application/json', 'authorization' : ud.AccessToken}});
        var res = JSON.parse(await response.text());
        var groupNames = [];
        groupNames = res.Results;
        this.setState({
            names: groupNames,
        })

    }

    render() {
        // console.log(this.state.names);
        
        // this.state.names.map((group, index) => (
        //     console.log(group.Name)
        // ))

        // console.log(this.state.issues);
        var _ud = localStorage.getItem('user_data');
        var ud = JSON.parse(_ud);
        var uid = ud.ID;

        const handleClick = async (id, gname) => {

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
            try {
                var obj = {groupID:id};        
                var js = JSON.stringify(obj); 
                const response = await fetch(buildPath('api/readIssue'), {method:'POST',body:js,headers:{'Content-Type': 'application/json', 'authorization' : ud.AccessToken}});    
                var res = JSON.parse(await response.text());
                if(res.Results.length === 0) {
                    this.setState({
                        issues: ["No Issues Yet."],
                        groupNames: gname,
                        groupID: id,
                    })
                }
                else {
                    this.setState({
                        issues: res.Results,
                        groupNames: gname,
                        groupID: id,
                    })
                }
            } catch(e) {
                alert(e.toString());
                return
            }
        }

        const handleClick2 = async (id, gname) => {

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
            var r = window.confirm("Are you sure you want to permanently delete this Group?");
            if (r == true)
            {
                try {
                    var _ud = localStorage.getItem('user_data');
                    var ud = JSON.parse(_ud);
                    var uid = ud.ID;

                    var obj = {userID:uid, groupID:id};        
                    var js = JSON.stringify(obj); 
                    const response = await fetch(buildPath('api/deleteGroup'), {method:'POST',body:js,headers:{'Content-Type': 'application/json', 'authorization' : ud.AccessToken}});    
                    var res = JSON.parse(await response.text());

                        this.setState({
                            message: res.Error,
                        })
                        this.componentWillMount();
                } catch(e) {
                    alert(e.toString());
                    return;
                }
            }
            else {
                return;
            }
        }

        
        const handleClick3 = async (id, gname) => {

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

            try {
                var _ud = localStorage.getItem('user_data');
                var ud = JSON.parse(_ud);
                var uid = ud.ID;
                var obj = {userID:uid, groupID:id};        
                var js = JSON.stringify(obj); 
                const response = await fetch(buildPath('api/leaveGroup'), {method:'POST',body:js,headers:{'Content-Type': 'application/json', 'authorization' : ud.AccessToken}});    
                var res = JSON.parse(await response.text());
                this.setState({
                    message: res.Error,
                })
                this.componentWillMount();
            } catch(e) {
                alert(e.toString());
                return;
            }
        }

        return(
            <>
                <div className="mygroups-div">
                    {this.state.names.map((group, index) => (
                        <span className="mygroup-names">
                            {group.Name}
                            <button id={group._id} className="hpg-group-button" onClick={() => handleClick(group._id, group.Name)}>Open Issues</button>
                            <button id={group._id} className="hpg-delete-button" onClick={() => handleClick2(group._id, group.Name)}><strong>X</strong></button>
                            <button id={group._id} className="hpg-leave-button" onClick={() => handleClick3(group._id, group.Name)}></button>
                        </span>
                        
                        ))}
                </div>
                <span id="deleteResult" className="delete-error">{this.state.message}</span>
                <SideBarIssues state={this.state}/>
            </>
        );
    }
}

export default JoinedGroups;