

// Copyright 2018 The Flutter team. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

import 'package:flutter/material.dart';
import 'package:english_words/english_words.dart';

void main() => runApp(MaterialApp(home: Home()));

class Home extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      body: Column(
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        crossAxisAlignment: CrossAxisAlignment.end,
        children: <Widget>[
          Text('hello, world'),
          FlatButton(
              onPressed: (){},
              color: Colors.amber,
              child: Text('click me')
          ),
          Container(
            color: Colors.cyan,
            padding: EdgeInsets.all(30.0),
            child: Text('inside container'),
          ),
        ],
      ),
      // decoration: BoxDecoration(
      //   gradient: LinearGradient(
      //     begin: Alignment.bottomCenter,
      //     end:
      //       Alignment(0.0, -2.0),
      //     colors: [
      //       const Color.fromARGB(0xFF, 0x50, 0xB2, 0x83),
      //       const Color.fromARGB(0xFF, 0xFF, 0xFF, 0xFF),
      //     ],
      //   ),
      // ),
      // child: Container(
      //  child: Text('Welcome to Austins Bootleg Stack Overflow Adventure'),
      //  ),
      // title: 'Welcome to Flutter',
      // decoration: BoxDecoration(
      //   gradient: LinearGradient(
      //     begin: Alignment.topCenter
      //   )
      //
      // ),
      // home: Scaffold(
      //   appBar: AppBar(
      //     title: Text('Welcome to Flutter'),
      //     backgroundColor: Color.fromARGB(0xFF, 0x32, 0xC9, 0x92),
      //   ),
      //   body: Container(
      //     padding: EdgeInsets.symmetric(horizontal: 30.0, vertical: 20.0),
      //     margin: EdgeInsets.all(150.0),
      //     color: Colors.grey[400],
      //     child: Text('Hello'),
      //   ),
      // Center(
      //   child: IconButton(
      //     onPressed: () {
      //       print('you clicked me huh?');
      //     },
      //     icon: Icon(Icons.alternate_email),
      //     color: Colors.green,
      //   ),
      // child: RaisedButton.icon(
      //   onPressed: () {},
      //   icon: Icon(
      //     Icons.workspaces_filled
      //   ),
      //   label: Text('Something Ominous'),
      //   color: Colors.lightBlue
      // ),
      // child: RaisedButton(
      //   onPressed: () {
      //     print('you clicked me, how could you?');
      //   },
      //   child: Text('Click me, jk thats weird'),
      //   color: Colors.tealAccent,
      // ),
      // child: Icon(
      //   Icons.airport_shuttle,
      //   color: Colors.lightBlue,
      //   size: 100.0
      // )
      // child: Text(
      //   wordPair.asPascalCase,
      //   style: TextStyle(
      //     fontSize: 40.0,
      //     fontWeight: FontWeight.bold,
      //     color: Colors.green,
      //     // fontFamily: 'Asap Condensed',
      //   ),
      // ),
      // child: Image(
      //   image: AssetImage('assets/headert.jpg'),
      //   // image: NetworkImage('https://www.nationalgeographic.com/content/dam/science/rights-exempt/nationalgeographic_2751013.adapt.1900.1.jpg'),
      // )
      // ),
      //   floatingActionButton: FloatingActionButton(
      //     onPressed: () {},
      //     child: Text('click'),
      //   ),
      // ),
    );
  }
}