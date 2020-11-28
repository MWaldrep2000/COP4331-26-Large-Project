// Copyright 2018 The Flutter team. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

import 'package:flutter/material.dart';
import 'package:english_words/english_words.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:startup_namer/UserData.dart';
import 'package:startup_namer/loginResults.dart';
import 'package:startup_namer/Register.dart';
import 'User.dart';
import 'dart:async';
import 'dart:convert';
import 'package:http/http.dart' as http;

Future<loginResults> fetchloginResults(String user, String password) async{
  final http.Response response = await http.post(
    'https://hivemindg26.herokuapp.com/api/login',
    headers: <String, String>{
      'Content-Type': 'application/json; charset=UTF-8'
    },
    body: jsonEncode(<String, String>{
      'login' : user,
      'password' : password
    }),
  );

  if (response.statusCode == 200) {
    print(response.body);
    return loginResults.fromJson(jsonDecode(response.body));
  }
  else{
    throw Exception('Failed to load');
  }
}

Future<Register> RegisterUser(String username, String password, String email) async{
  final http.Response response = await http.post(
    'https://hivemindg26.herokuapp.com/api/register',
    headers: <String, String>{
      'Content-Type': 'application/json; charset=UTF-8'
    },
    body: jsonEncode(<String, String>{
      'username' : username,
      'password' : password,
      'email' : email
    }),
  );

  if (response.statusCode == 200) {
    print(response.body);
    return Register.fromJson(jsonDecode(response.body));
  }
  else{
    throw Exception('Failed to load album');
  }
}

void main() {
  runApp(MaterialApp(
      home: Home()
  ));
}

//#region LoginPage
class Home extends StatefulWidget {
  @override
  _HomeState createState() => _HomeState();
}

class _HomeState extends State<Home> {

  final firstController = TextEditingController();

  @override
  void dispose() {
    firstController.dispose();
    super.dispose();
  }

  // @override
  // void initState() {
  //   super.initState();
  //   _futureloginResults = fetchloginResults("", "");
  // }

  User tempUser = new User("","");

  Future<loginResults> _futureloginResults;

  var token;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        FocusScopeNode currentFocus = FocusScope.of(context);

        if (!currentFocus.hasPrimaryFocus) {
          currentFocus.unfocus();
        }
      },
      child: Scaffold(
        body: Center(
          child: Container(
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
          child: Center(
            child: SingleChildScrollView(
              child: Column( // WAS COLUMN
                children: <Widget>[
                  // Padding(
                  //   padding: const EdgeInsets.only(top:150),
                  // ),
                  Container(
                    child: Text(
                      'Welcome to HiveMind',
                      style: TextStyle(
                        fontSize: 30,
                        color: Colors.green,
                      ),
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.only(top: 120),
                    child: Container(
                      width: 350,
                      height: 50,
                      decoration: BoxDecoration(
                        color: Color.fromRGBO(0xFF, 0xFF, 0xFF, 200.0),
                        borderRadius: BorderRadius.all(Radius.circular(20))
                      ),
                      child: TextFormField(
                          controller: firstController,
                          decoration: InputDecoration(
                            border: InputBorder.none,
                            labelText: 'Login',
                              labelStyle: TextStyle(
                                  color: Colors.black
                              ),
                            floatingLabelBehavior: FloatingLabelBehavior.never,
                            contentPadding:
                              EdgeInsets.only(left: 15, bottom: 18, top: 11, right: 15)
                          ),
                        onChanged: (temp) {
                            tempUser.login = temp;
                        },
                      ),
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.only(top: 20.0),
                    child: Container(
                      width: 350,
                      height: 50,
                      decoration: BoxDecoration(
                          color: Color.fromRGBO(0xFF, 0xFF, 0xFF, 180.0),
                          borderRadius: BorderRadius.all(Radius.circular(20))
                      ),
                      child: TextFormField(
                        obscureText: true,
                        decoration: InputDecoration(
                            border: InputBorder.none,
                            labelText: 'Password',
                            labelStyle: TextStyle(
                              color: Colors.black
                            ),
                            floatingLabelBehavior: FloatingLabelBehavior.never,
                            contentPadding:
                            EdgeInsets.only(left: 15, bottom: 18, top: 11, right: 15)
                        ),
                        onChanged: (temp) {
                          tempUser.password = temp;
                        },
                      ),
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.only(top: 40.0)
                  ),
                  Container(
                    height: 50,
                    width: 300,
                    child: RaisedButton(
                      elevation: 5.0,
                      onPressed: () {
                        _futureloginResults = fetchloginResults(tempUser.login, tempUser.password);

                      },
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(30.0),
                      ),
                      color: Colors.white,
                      child: Text(
                        'LOGIN',
                        style: TextStyle(
                            color: Colors.teal[400],
                            letterSpacing: 6,
                        ),
                      ),
                    ),
                  ),
                  Container(
                      alignment: Alignment.centerRight,
                      width: double.infinity,
                      child: FlatButton(
                          onPressed: () {
                            // print('New User Button Pressed'),
                            Navigator.push(
                              context,
                                MaterialPageRoute(builder: (context) => SecondRoute()),
                            );
                          },
                          padding: EdgeInsets.only(right: 40.0),
                          child: Text(
                            'New User?',
                            style: TextStyle(
                              color: Colors.blue,
                              decoration: TextDecoration.underline,
                            ),
                          ),
                      ),
                  ),
                  Container(
                    alignment: Alignment.centerRight,
                    child: FlatButton(
                      onPressed: () {
                        Navigator.push(
                          context,
                          MaterialPageRoute(builder: (context) => ThirdRoute()),
                        );
                      },
                      padding: EdgeInsets.only(right: 40.0),
                      child: Text(
                        'Forgot Password?',
                        style: TextStyle(
                          color: Colors.blue,
                          decoration: TextDecoration.underline,
                        ),
                      ),
                    ),
                  ),
                  // FutureBuilder<loginResults>(
                  //   future: _futureloginResults,
                  //   builder: (context, snapshot) {
                  //     if (snapshot.hasData){
                  //       var parsedJson = json.decode(snapshot);
                  //       print(snapshot['flag']);
                  //     }
                  //     else {
                  //       Fluttertoast.showToast(msg: 'Incorrect Username and Password Combination');
                  //     }
                  //
                  //     return Container(width:0.0, height:0.0);
                  //   }
                  // ),
                ],
              ),
            ),
          ),
          ),
        )
      ),
    );
  }
}
//endregion

//#region CreateUserPage
class SecondRoute extends StatefulWidget {
  @override
  _SecondRouteState createState() => _SecondRouteState();
}

class _SecondRouteState extends State<SecondRoute> {

  Future<Register> _futureRegisterResults;

  String username;

  String password;

  String email;

  String passwordConfirm;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        FocusScopeNode currentFocus = FocusScope.of(context);

        if (!currentFocus.hasPrimaryFocus) {
          currentFocus.unfocus();
        }
      },
      child: Scaffold(
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
                    padding: const EdgeInsets.only(top: 40),
                  ),
                  Container(
                    child: Text(
                      'Create User',
                      style: TextStyle(
                      fontSize: 30,
                      color: Colors.green,
                      ),
                    ),
                  ),
              Padding(
                padding: const EdgeInsets.only(top: 60.0),
                child: Container(
                  width: 350,
                  height: 50,
                  decoration: BoxDecoration(
                    color: Color.fromRGBO(0xFF, 0xFF, 0xFF, 180.0),
                    borderRadius: BorderRadius.all(Radius.circular(20))
                ),
                child: TextFormField(
                  decoration: InputDecoration(
                      border: InputBorder.none,
                      labelText: 'Username',
                      labelStyle: TextStyle(
                          color: Colors.black
                      ),
                      floatingLabelBehavior: FloatingLabelBehavior.never,
                      contentPadding:
                      EdgeInsets.only(left: 15, bottom: 18, top: 11, right: 15),
                  ),
                  onChanged: (temp) {
                    username = temp;
                  },
                ),
                ),
              ),
                    Padding(
                      padding: const EdgeInsets.only(top: 60.0),
                      child: Container(
                        width: 350,
                        height: 50,
                        decoration: BoxDecoration(
                            color: Color.fromRGBO(0xFF, 0xFF, 0xFF, 180.0),
                            borderRadius: BorderRadius.all(Radius.circular(20))
                        ),
                        child: TextFormField(
                          decoration: InputDecoration(
                              border: InputBorder.none,
                              labelText: 'Email',
                              labelStyle: TextStyle(
                                  color: Colors.black
                              ),
                              floatingLabelBehavior: FloatingLabelBehavior.never,
                              contentPadding:
                              EdgeInsets.only(left: 15, bottom: 18, top: 11, right: 15)
                          ),
                          onChanged: (temp) {
                            email = temp;
                          },
                        ),

                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.only(top: 60.0),
                      child: Container(
                        width: 350,
                        height: 50,
                        decoration: BoxDecoration(
                            color: Color.fromRGBO(0xFF, 0xFF, 0xFF, 180.0),
                            borderRadius: BorderRadius.all(Radius.circular(20))
                        ),
                        child: TextFormField(
                          obscureText: true,
                          decoration: InputDecoration(
                              border: InputBorder.none,
                              labelText: 'Password',
                              labelStyle: TextStyle(
                                  color: Colors.black
                              ),
                              floatingLabelBehavior: FloatingLabelBehavior.never,
                              contentPadding:
                              EdgeInsets.only(left: 15, bottom: 18, top: 11, right: 15)
                          ),
                          onChanged: (temp) {
                            password = temp;
                          },
                        ),

                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.only(top: 60.0),
                      child: Container(
                        width: 350,
                        height: 50,
                        decoration: BoxDecoration(
                            color: Color.fromRGBO(0xFF, 0xFF, 0xFF, 180.0),
                            borderRadius: BorderRadius.all(Radius.circular(20))
                        ),
                        child: TextFormField(
                          obscureText: true,
                          decoration: InputDecoration(
                              border: InputBorder.none,
                              labelText: 'Confirm Password',
                              labelStyle: TextStyle(
                                  color: Colors.black
                              ),
                              floatingLabelBehavior: FloatingLabelBehavior.never,
                              contentPadding:
                              EdgeInsets.only(left: 15, bottom: 18, top: 11, right: 15)
                          ),
                          onChanged: (temp) {
                            passwordConfirm = temp;
                          },
                        ),

                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.only(top: 20),
                    ),
                    RaisedButton(
                      elevation: 5.0,
                      onPressed: () {
                        if (password == passwordConfirm) {
                          _futureRegisterResults = RegisterUser(username, password, email);
                          Fluttertoast.showToast(msg: 'User Created');
                          Navigator.pop(context);
                        }

                        else {
                          Fluttertoast.showToast(msg: 'Passwords do not match');
                        }//if (snapshot.hasdata)
                        //_futureloginResults = fetchloginResults(tempUser.login, tempUser.password);
                      },
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(60.0),
                      ),
                      color: Colors.white,
                      child: Text(
                        'Create User',
                        style: TextStyle(
                          color: Colors.teal[400],
                          letterSpacing: 4,
                        ),
                      ),
                    ),
                    Padding(
                      padding: EdgeInsets.only(top: 20)
                    ),
                    ElevatedButton(
                      onPressed: () {
                    Navigator.pop(context);
                  },
                  child: Text('Go back!'),
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
//#endregion

//#region PasswordRecoverPage
class ThirdRoute extends StatefulWidget {
  @override
  _ThirdRouteState createState() => _ThirdRouteState();
}

class _ThirdRouteState extends State<ThirdRoute> {
  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        FocusScopeNode currentFocus = FocusScope.of(context);

        if (!currentFocus.hasPrimaryFocus) {
          currentFocus.unfocus();
        }
      },
      child: Scaffold(
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
                    padding: const EdgeInsets.only(top: 100),
                  ),
                  Container(
                    child: Text(
                      'Password Recovery',
                      style: TextStyle(
                        fontSize: 30,
                        color: Colors.green,
                      ),
                    ),
                  ),
                ]
              )
            )
          )
        )
      )
    );
  }
}
//#endregion