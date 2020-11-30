import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:localstorage/localstorage.dart';
import 'package:startup_namer/User.dart';
import 'package:startup_namer/loginResults.dart';
import 'package:startup_namer/Register.dart';
import 'package:startup_namer/pages/CreateGroup.dart';
import 'package:startup_namer/pages/CreateUser.dart';
import 'package:startup_namer/pages/Login.dart';
import 'package:startup_namer/pages/PasswordRecovery.dart';
import 'dart:async';
import 'dart:convert';
import 'package:http/http.dart' as http;

import 'AddGroup.dart';



class HomePage extends StatefulWidget {
  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  @override

  final LocalStorage storage = new LocalStorage('data');

  Widget build(BuildContext context) {
    return GestureDetector(

      onTap: () {
        FocusScopeNode currentFocus = FocusScope.of(context);

        if (!currentFocus.hasPrimaryFocus) {
          currentFocus.unfocus();
        }
      },
      child: Scaffold(
        appBar: AppBar(
          // backgroundColor: Color.fromARGB(255, 158, 255, 169),
          backgroundColor: Colors.teal,
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

                  Padding(padding: EdgeInsets.only(top: 60)),

                  Container(
                    width: 360,
                    height: 100,
                    decoration: BoxDecoration(
                        color: Colors.white,
                        borderRadius: BorderRadius.all(Radius.circular(10))
                    ),
                    child: RaisedButton(
                      onPressed: () {
                        // Navigator.push(
                        //   context,
                        //   MaterialPageRoute(builder: (context) => MyGroups()),
                        // );
                      },
                      shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(10.0)
                      ),
                      color: Colors.greenAccent,
                      child: Text(
                          'My Groups',
                        style: TextStyle(
                          fontSize: 30
                        ),

                      ),
                    ),
                  ),
                  Padding(padding: EdgeInsets.only(top: 20)),

                  Container(
                    width: 360,
                    height: 100,
                    decoration: BoxDecoration(
                        color: Colors.white,
                        borderRadius: BorderRadius.all(Radius.circular(10))
                    ),
                    child: RaisedButton(
                      onPressed: () {
                        // Navigator.push(
                        //   context,
                        //   MaterialPageRoute(builder: (context) => MyIssues()),
                        // );
                      },
                      shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(10.0)
                      ),
                      color: Colors.greenAccent,
                      child: Text(
                        'My Issues',
                        style: TextStyle(
                            fontSize: 30
                        ),

                      ),
                    ),
                  ),
                  Padding(padding: EdgeInsets.only(top: 20)),

                  Container(
                    width: 360,
                    height: 100,
                    decoration: BoxDecoration(
                        color: Colors.white,
                        borderRadius: BorderRadius.all(Radius.circular(10))
                    ),
                    child: RaisedButton(
                      onPressed: () {
                        Navigator.push(
                          context,
                          MaterialPageRoute(builder: (context) => AddGroup()),
                        );
                      },
                      shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(10.0)
                      ),
                      color: Colors.greenAccent,
                      child: Text(
                        'Search Groups',
                        style: TextStyle(
                            fontSize: 30
                        ),

                      ),
                    ),
                  ),
                  Padding(padding: EdgeInsets.only(top: 20)),

                  Container(
                    width: 360,
                    height: 100,
                    decoration: BoxDecoration(
                        color: Colors.white,
                        borderRadius: BorderRadius.all(Radius.circular(10))
                    ),
                    child: RaisedButton(
                      onPressed: () {
                        Navigator.push(
                          context,
                          MaterialPageRoute(builder: (context) => CreateGroup()),
                        );
                      },
                      shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(10.0)
                      ),
                      color: Colors.greenAccent,
                      child: Text(
                        'Create Group',
                        style: TextStyle(
                            fontSize: 30
                        ),

                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
      ),


    );
  }
}
