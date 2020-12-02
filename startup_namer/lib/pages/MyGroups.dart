import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:startup_namer/User.dart';
import 'package:startup_namer/loginResults.dart';
import 'package:startup_namer/Register.dart';
import 'package:startup_namer/pages/CreateUser.dart';
import 'package:startup_namer/pages/HomePage.dart';
import 'package:startup_namer/pages/Login.dart';
import 'package:startup_namer/getGroups.dart';
import 'package:startup_namer/joinGroup.dart';
import 'package:startup_namer/searchGroups.dart';
import 'package:startup_namer/pages/PasswordRecovery.dart';
import 'package:localstorage/localstorage.dart';
import 'dart:async';
import 'dart:convert';
import 'package:http/http.dart' as http;

import 'GroupIssues.dart';


class MyGroups extends StatefulWidget {
  @override
  _MyGroupsState createState() => _MyGroupsState();
}

class _MyGroupsState extends State<MyGroups> {

  Future<getGroups> _getGroupsResults;
  getGroups currentGroups;

  final LocalStorage storage = new LocalStorage('data');


  @override
  Widget build(BuildContext context) {

    // Initially gets all of the groups in the database
    _getGroupsResults = fetchGroupsResults(1, storage.getItem('ID'));
    _getGroupsResults.then((temp) {
      currentGroups = temp;
      print(temp.groupList);
      // print(currentGroups.groupList);
      //print("TestingA");
    });

    return GestureDetector(
        onTap: () {
          FocusScopeNode currentFocus = FocusScope.of(context);

          if (!currentFocus.hasPrimaryFocus) {
            currentFocus.unfocus();
          }
        },
        child: Scaffold(
            appBar: AppBar(
              title: Text("My Groups"),
              backgroundColor: Colors.teal,
              leading: IconButton(
                  alignment: Alignment.center,
                  icon: const Icon(Icons.arrow_back),
                  onPressed: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(builder: (context) => HomePage()),
                    );
                  }
              ),
              actions: <Widget>[
                IconButton(
                  icon: Icon(
                      Icons.assignment_return,
                      color: Colors.white
                  ),
                  onPressed: () {
                    storage.clear();
                    Navigator.pushReplacement(
                        context,
                        MaterialPageRoute(builder: (context) => Login())
                    );
                  },
                ),
              ],
            ),
            body: Center(
                child: Container(
                  width: double.infinity,
                  height: double.infinity,
                  decoration: BoxDecoration(
                    gradient: LinearGradient(
                      begin: Alignment.bottomCenter,
                      end: Alignment(0.0, -2.0),
                      colors: [
                        const Color.fromARGB(0xFF, 0x50, 0xB2, 0x83),
                        const Color.fromARGB(0xFF, 0xFF, 0xFF, 0xFF),
                      ],
                    ),
                  ),
                  child: SingleChildScrollView(
                      child: Column(
                          children: <Widget>[
                            Padding(
                                padding: EdgeInsets.only(top:20)
                            ),

                            // FutureBuilder(

                            // ),
                            Padding(
                              padding: EdgeInsets.only(top:20),
                            ),

                            SingleChildScrollView(
                              child: FutureBuilder(
                                  future: _getGroupsResults,
                                  builder: (BuildContext context, AsyncSnapshot snapshot) {
                                    List<Widget> children;
                                    if (snapshot.connectionState == ConnectionState.done) {
                                      List<Widget> cardWidgets = [];
                                      if(snapshot.data != null){
                                        for (int i = 0; i < snapshot.data.groupList.length; i++) {
                                          cardWidgets.add(Card(
                                              margin: EdgeInsets.fromLTRB(16.0, 16.0, 16.0, 16.0),
                                              child: Padding(
                                                padding: const EdgeInsets.all(16.0),
                                                child: Row(
                                                    children: <Widget> [
                                                      Container(
                                                        width: 200,
                                                        child: Text(
                                                          snapshot.data.groupList[i]['Name'],
                                                          overflow: TextOverflow.ellipsis,
                                                        ),
                                                      ),
                                                      Padding(
                                                          padding: EdgeInsets.only(left:10)
                                                      ),
                                                      RaisedButton(
                                                        elevation: 5.0,
                                                        onPressed: () {
                                                          storage.setItem('CurrentGroup', snapshot.data.groupList[i]['_id']);
                                                          print(snapshot.data.groupList[i]['GroupID']);
                                                          print("Going into Groups Issues");
                                                          Navigator.push(
                                                            context,
                                                            MaterialPageRoute(builder: (context) => GroupIssues()),
                                                          );
                                                          // print(snapshot.data[1].groupList[i]['_id']);
                                                          // _getJoinGroupResults = fetchJoinResults(storage.getItem('ID'), snapshot.data[0].groupList[i]['_id']);
                                                          // _getJoinGroupResults.then((JoinGroupResult){
                                                          //   print("hahahahahahaha");
                                                          //   print(storage.getItem('ID'));
                                                          //   print(snapshot.data[0].groupList[i]['_id']);
                                                          //   Fluttertoast.showToast(msg: JoinGroupResult.error);
                                                          // });
                                                        },
                                                        shape: RoundedRectangleBorder(
                                                          borderRadius: BorderRadius.circular(10.0),
                                                        ),
                                                        color: Colors.tealAccent,
                                                        child: Text(
                                                          'View Issues',
                                                          style: TextStyle(
                                                            color: Colors.teal[400],
                                                            letterSpacing: 2,
                                                          ),
                                                        ),
                                                      )
                                                    ]
                                                ),
                                              )
                                          ));
                                        }
                                      }
                                      children = cardWidgets;
                                    }

                                    else {
                                      print('Before loading circle');
                                      // print(currentGroups.groupList);
                                      children = <Widget>[
                                        SizedBox(
                                          child: CircularProgressIndicator(),
                                          width: 40,
                                          height: 40,
                                        )
                                      ];
                                    }

                                    return Center(
                                        child: Column(
                                          mainAxisAlignment: MainAxisAlignment.center,
                                          crossAxisAlignment: CrossAxisAlignment.center,
                                          children: children,
                                        )
                                    );
                                  }
                              ),
                            )
                          ]
                      )
                  ),
                )
            )
        )
    );
  }
}