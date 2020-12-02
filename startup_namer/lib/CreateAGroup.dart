import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:localstorage/localstorage.dart';

class createGroupResults{
  final String id;
  final String error;

  createGroupResults({this.id, this.error});

  // factory keyword is used when the constructor doesn't always create an object
  factory createGroupResults.fromJson(Map<String, dynamic> json) {
    return createGroupResults(
        id: json['ID'],
        error: json['Error'],
    );
  }
}

Future<createGroupResults> fetchcreateGroupResults(String user, String groupname) async{
  final LocalStorage storage = new LocalStorage('data');
  final http.Response response = await http.post(
    'https://hivemindg26.herokuapp.com/api/createGroup',
    headers: <String, String>{
      'Content-Type': 'application/json; charset=UTF-8', 'authorization': storage.getItem('AccessToken')
    },
    body: jsonEncode(<String, String>{
      'userID' : user,
      'groupname' : groupname
    }),
  );

  if (response.statusCode == 200) {
    return createGroupResults.fromJson(jsonDecode(response.body));
  }
  else{
    throw Exception('Failed to load');
  }
}