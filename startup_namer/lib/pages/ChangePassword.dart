import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:localstorage/localstorage.dart';
import 'package:startup_namer/User.dart';
import 'package:startup_namer/loginResults.dart';
import 'package:startup_namer/Register.dart';
import 'package:startup_namer/pages/CreateUser.dart';
import 'package:startup_namer/pages/Login.dart';
import 'package:startup_namer/pages/PasswordRecovery.dart';
import 'dart:async';
import 'dart:convert';
import 'package:http/http.dart' as http;

class ChangePassword extends StatefulWidget {
  @override
  _ChangePasswordState createState() => _ChangePasswordState();
}

class _ChangePasswordState extends State<ChangePassword> {

  var username = '';
  var password = '';
  var res;
  @override
  Widget build(BuildContext context) {
    Timer(
        Duration(seconds: 3),
            () =>
            Navigator.of(context).pushReplacement(MaterialPageRoute(
                builder: (BuildContext context) => Login())));
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
                                  'Please check your email',
                                  style: TextStyle(
                                    fontSize: 30,
                                    color: Colors.green,
                                  ),
                                ),
                              ),
                              Padding(
                                padding: const EdgeInsets.only(top: 100),
                              ),
                              Container(
                                child: Text(
                                  'An email has been sent to the address you supplied'
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

  Future<void> fetchChangePassword() async {
    print("here");
    Map parsed = new Map();
    final http.Response response = await http.post(
      'https://hivemindg26.herokuapp.com/api/changePassword',
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8'
      },
      body: jsonEncode(<String, String>{
        'userID' : '5fc5cf8b2c6d980017a24a03',
        'password' : password
      }),
    );
    parsed = json.decode(response.body);
    print(parsed);


    // if(parsed['Error'] == 'User not found') {
    //   res = 1;
    //   Fluttertoast.showToast(msg: "No user with that email");
    //   return;
    // }
    // res = 0;
    return;
  }
}