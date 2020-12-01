import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:startup_namer/User.dart';
import 'package:startup_namer/loginResults.dart';
import 'package:startup_namer/Register.dart';
import 'package:startup_namer/pages/CreateGroup.dart';
import 'package:startup_namer/pages/CreateUser.dart';
import 'package:startup_namer/pages/HomePage.dart';
import 'package:startup_namer/pages/Login.dart';
import 'package:startup_namer/pages/PasswordRecovery.dart';
import 'dart:async';
import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:localstorage/localstorage.dart';

import 'Verification.dart';

class Login extends StatefulWidget {
  @override
  _LoginState createState() => _LoginState();
}

class _LoginState extends State<Login> {

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
  final LocalStorage storage = new LocalStorage('data');
  Future<loginResults> _futureloginResults;
  loginResults currentUser;

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
                          'Welcome to Hivemind',
                          style: TextStyle(
                            fontWeight: FontWeight.bold,
                            fontSize: 32,
                            color: Colors.green,
                            letterSpacing: 3,
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
                            _futureloginResults.then((currentUser) {
                              print("The future is holding data");
                              print(currentUser.flag);
                              storage.setItem('ID', currentUser.id);
                              storage.setItem('Validated', currentUser.validated);
                              storage.setItem('Flag', currentUser.flag);
                              storage.setItem('User', tempUser.login);

                              if (currentUser.validated == 1) {
                                Navigator.pushReplacement(
                                  context,
                                  MaterialPageRoute(builder: (context) => HomePage()),
                                );
                              }
                              else {
                                Navigator.push(
                                  context,
                                  MaterialPageRoute(builder: (context) => Verification()),
                                );
                              }
                              // var id = storage.getItem('ID');
                              // print(id);
                            });
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
                              MaterialPageRoute(builder: (context) => CreateUser()),
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
                              MaterialPageRoute(builder: (context) => PasswordRecover()),
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