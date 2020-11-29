import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:startup_namer/User.dart';
import 'package:startup_namer/loginResults.dart';
import 'package:startup_namer/Register.dart';
import 'package:startup_namer/pages/CreateUser.dart';
import 'package:startup_namer/pages/Login.dart';
import 'package:startup_namer/pages/PasswordRecovery.dart';
import 'dart:async';
import 'dart:convert';
import 'package:http/http.dart' as http;

class CreateUser extends StatefulWidget {
  @override
  _CreateUserState createState() => _CreateUserState();
}

class _CreateUserState extends State<CreateUser> {

  Future<Register>  _futureRegisterResults;

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