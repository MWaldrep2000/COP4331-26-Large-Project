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
        }
    }

    async componentWillMount() {
        var _ud = localStorage.getItem('user_data');
        var ud = JSON.parse(_ud);
        var obj = {flag:1, userID:ud.ID};        
        var js = JSON.stringify(obj);  
        const response = await fetch('http://localhost:5000/api/readGroup', {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
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
            try {
                var obj = {groupID:id};        
                var js = JSON.stringify(obj); 
                const response = await fetch('http://localhost:5000/api/readIssue', {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});    
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

        return(
            <>
                <div className="mygroups-div">
                    {this.state.names.map((group, index) => (
                        <span className="mygroup-names">
                            {group.Name}
                            <button id={group._id} className="hpg-group-button" onClick={() => handleClick(group._id, group.Name)}>Open Issues</button>
                        </span>
                        
                        ))}
                </div>
                <SideBarIssues state={this.state}/>
            </>
        );
    }
}

export default JoinedGroups;