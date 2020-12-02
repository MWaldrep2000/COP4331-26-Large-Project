import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:localstorage/localstorage.dart';

class getGroups{
  var groupList;
  String error;

  getGroups({this.groupList, this.error});

  // factory keyword is used when the constructor doesn't always create an object
  factory getGroups.fromJson(Map<String, dynamic> json) {
    return getGroups(
        groupList : json['Results'],
        error: json['Error']
    );
  }
}

Future<getGroups> fetchGroupsResults(int flag, String userID) async{
    final LocalStorage storage = new LocalStorage('data');
    final http.Response response = await http.post(
      'https://hivemindg26.herokuapp.com/api/readGroup',
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8', 'authorization': storage.getItem('AccessToken')
      },
      body: jsonEncode(<dynamic, dynamic>{
        'flag': flag,
        'userID': userID
      }),
    );

  if (response.statusCode == 200) {
    print(response.body);
    return getGroups.fromJson(jsonDecode(response.body));
  }
  else{
    throw Exception('Failed to load');
  }
}