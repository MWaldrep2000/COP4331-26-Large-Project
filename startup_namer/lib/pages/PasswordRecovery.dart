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

class PasswordRecover extends StatefulWidget {
  @override
  _PasswordRecoverState createState() => _PasswordRecoverState();
}

class _PasswordRecoverState extends State<PasswordRecover> {
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