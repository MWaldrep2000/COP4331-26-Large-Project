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
import 'package:startup_namer/verify.dart';


class Verification extends StatefulWidget {
  @override
  _VerificationState createState() => _VerificationState();
}

class _VerificationState extends State<Verification> {

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

  String tempUser;
  String validationCode;
  final LocalStorage storage = new LocalStorage('data');
  Future<verify> _futureverifyResults;
  verify verificationResults;

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
                          'Verify Account',
                          style: TextStyle(
                            fontSize: 32,
                            color: Colors.green,
                            letterSpacing: 2,
                          ),
                        ),
                      ),
                      Padding(
                        padding: const EdgeInsets.only(top: 60),
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
                                labelText: 'Enter Username',
                                labelStyle: TextStyle(
                                    color: Colors.black
                                ),
                                floatingLabelBehavior: FloatingLabelBehavior.never,
                                contentPadding:
                                EdgeInsets.only(left: 15, bottom: 18, top: 11, right: 15)
                            ),
                            onChanged: (temp) {
                              tempUser = temp;
                            },
                          ),
                        ),
                      ),
                      Padding(
                        padding: const EdgeInsets.only(top: 40.0),
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
                                labelText: 'Enter Verification Code',
                                labelStyle: TextStyle(
                                    color: Colors.black
                                ),
                                floatingLabelBehavior: FloatingLabelBehavior.never,
                                contentPadding:
                                EdgeInsets.only(left: 15, bottom: 18, top: 11, right: 15)
                            ),
                            onChanged: (temp) {
                              validationCode = temp;
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
                            _futureverifyResults = fetchverify(tempUser, validationCode);
                            _futureverifyResults.then((verificationResults) {
                              print("The future is holding data");

                              if (verificationResults.error == "Validation success") {
                                Fluttertoast.showToast(msg: verificationResults.error);
                                Navigator.pushReplacement(
                                  context,
                                  MaterialPageRoute(builder: (context) => HomePage()),
                                );
                              }
                              else {
                                Fluttertoast.showToast(msg: verificationResults.error);
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
                            'VERIFY',
                            style: TextStyle(
                              color: Colors.teal[400],
                              letterSpacing: 6,
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