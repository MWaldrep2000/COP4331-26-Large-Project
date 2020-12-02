import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:localstorage/localstorage.dart';

class joinGroup{
  String error;

  joinGroup({this.error});

  // factory keyword is used when the constructor doesn't always create an object
  factory joinGroup.fromJson(Map<String, dynamic> json) {
    return joinGroup(
        error: json['Error']
    );
  }
}

Future<joinGroup> fetchJoinResults(String userID, String groupID) async{
  final LocalStorage storage = new LocalStorage('data');
  final http.Response response = await http.post(
    'https://hivemindg26.herokuapp.com/api/joinGroup',
    headers: <String, String>{
      'Content-Type': 'application/json; charset=UTF-8', 'authorization': storage.getItem('AccessToken')
    },
    body: jsonEncode(<dynamic, dynamic>{
      'userID': userID,
      'groupID': groupID
    }),
  );

  if (response.statusCode == 200) {
    // print(response.body);
    return joinGroup.fromJson(jsonDecode(response.body));
  }
  else{
    throw Exception('Failed to load');
  }
}