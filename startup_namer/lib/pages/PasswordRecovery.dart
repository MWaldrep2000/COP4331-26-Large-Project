import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:localstorage/localstorage.dart';
import 'package:startup_namer/User.dart';
import 'package:startup_namer/loginResults.dart';
import 'package:startup_namer/Register.dart';
import 'package:startup_namer/pages/CreateUser.dart';
import 'package:startup_namer/pages/HomePage.dart';
import 'package:startup_namer/pages/Login.dart';
import 'package:startup_namer/pages/PasswordRecovery.dart';
import 'dart:async';
import 'dart:convert';
import 'package:http/http.dart' as http;

import 'ChangePassword.dart';

class PasswordRecovery extends StatefulWidget {
  @override
  _PasswordRecoveryState createState() => _PasswordRecoveryState();
}

class _PasswordRecoveryState extends State<PasswordRecovery> {

  var email = '';
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
            appBar: AppBar(
              backgroundColor: Colors.teal,
              actions: <Widget>[
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
                              Padding(
                                padding: const EdgeInsets.only(top: 100),
                              ),
                              Padding(padding: EdgeInsets.only(left: 10)),
                              Container(
                                width: 350,
                                height: 50,
                                decoration: BoxDecoration(
                                    color: Color.fromRGBO(0xFF, 0xFF, 0xFF, 200.0),
                                    borderRadius: BorderRadius.all(Radius.circular(20))
                                ),
                                child: TextFormField(

                                  decoration: InputDecoration(
                                      border: InputBorder.none,
                                      labelText: 'Please Enter Your Email:',
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
                              Padding(padding: EdgeInsets.only(top: 10)),
                              Container(
                                width: 120,
                                height: 30,
                                decoration: BoxDecoration(
                                    color: Colors.white,
                                    borderRadius: BorderRadius.all(Radius.circular(10))
                                ),
                                child: RaisedButton(
                                  onPressed: () {
                                    fetchPasswordRecovery();
                                  },
                                  shape: RoundedRectangleBorder(
                                      borderRadius: BorderRadius.circular(10.0)
                                  ),
                                  color: Colors.white,
                                  child: Text(
                                    'Submit',
                                    style: TextStyle(
                                      color: Colors.teal[400],
                                      letterSpacing: 6,
                                    ),
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

  Future<void> fetchPasswordRecovery() async {
    Map parsed = new Map();
    final http.Response response = await http.post(
      'https://hivemindg26.herokuapp.com/api/resetPasswordLink',
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8'
      },
      body: jsonEncode(<String, String>{
        'email' : email
      }),
    );
      parsed = json.decode(response.body);

      if(parsed['Error'] == 'User not found') {

        print('user not found');
        Fluttertoast.showToast(msg: "No user with that email");
        return;
      }
      Navigator.push(
        context,
        MaterialPageRoute(builder: (context) => ChangePassword()),
      );
  }
}