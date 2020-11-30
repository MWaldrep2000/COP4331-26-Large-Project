import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';
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
import '../CreateAGroup.dart';
import 'package:localstorage/localstorage.dart';


class CreateGroup extends StatefulWidget {
  @override
  _CreateGroupState createState() => _CreateGroupState();
}

class _CreateGroupState extends State<CreateGroup> {

  Future<createGroupResults> _futurecreateGroupResults;
  createGroupResults currentUser;
  final LocalStorage storage = new LocalStorage('data');
  var groupName = '';

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
          leading: IconButton(
            alignment: Alignment.center,
            icon: const Icon(Icons.arrow_back),
            onPressed: (){
              storage.clear();
              Navigator.push(
                context,
                MaterialPageRoute(builder: (context) => HomePage()),
              );
            },
          ),
          backgroundColor: Colors.teal,
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

                  Padding(padding: EdgeInsets.only(top: 190)),

                  Container(
                    width: 360,
                    height: 80,
                    decoration: BoxDecoration(
                        // color: Color.fromRGBO(0xFF, 0xFF, 0xFF, 200.0),
                        borderRadius: BorderRadius.all(Radius.circular(20))
                    ),
                    child: TextFormField(
                      textAlign: TextAlign.center,
                      decoration: InputDecoration(
                        labelText: 'Enter Your Group Name',
                      ),
                      onChanged: (temp) {
                        groupName = temp;
                      },
                    ),
                  ),
                  Padding(padding: EdgeInsets.only(top: 20)),
                  RaisedButton(
                    elevation: 5.0,
                    onPressed: () {
                      if(groupName.length == 0) {
                        Fluttertoast.showToast(msg: 'Please Create a Name!');
                      }
                      var id = storage.getItem('ID');
                      _futurecreateGroupResults = fetchcreateGroupResults(id, groupName);
                      _futurecreateGroupResults.then((groupData) {
                          if(groupData.error.contains('Group already Exists') ){
                            Fluttertoast.showToast(msg: 'Group has already been created!');
                          }
                      });
                    },
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(30.0),
                    ),
                    color: Colors.white,
                    child: Text(
                      'Create Group',
                      style: TextStyle(
                        color: Colors.teal[400],
                        letterSpacing: 6,
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
