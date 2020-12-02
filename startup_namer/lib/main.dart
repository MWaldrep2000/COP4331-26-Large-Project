// Copyright 2018 The Flutter team. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:startup_namer/loginResults.dart';
import 'package:startup_namer/Register.dart';
import 'package:startup_namer/pages/ChangePassword.dart';
import 'package:startup_namer/pages/CreateUser.dart';
import 'package:startup_namer/pages/Login.dart';
import 'package:startup_namer/pages/AddGroup.dart';
import 'package:startup_namer/pages/PasswordRecovery.dart';
import 'User.dart';
import 'dart:async';
import 'dart:convert';
import 'package:http/http.dart' as http;


void main() {
  runApp(MaterialApp(
      home: Login()
  ));
}