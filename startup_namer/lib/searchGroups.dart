import 'dart:convert';
import 'package:http/http.dart' as http;

class searchGroups{
  var groupList;
  String error;

  searchGroups({this.groupList, this.error});

  // factory keyword is used when the constructor doesn't always create an object
  factory searchGroups.fromJson(Map<String, dynamic> json) {
    return searchGroups(
        groupList : json['Results'],
        error: json['Error']
    );
  }
}

Future<searchGroups> fetchSearchResults(String search) async{
  final http.Response response = await http.post(
    'https://hivemindg26.herokuapp.com/api/searchGroup',
    headers: <String, String>{
      'Content-Type': 'application/json; charset=UTF-8'
    },
    body: jsonEncode(<dynamic, dynamic>{
      'search': search
    }),
  );

  if (response.statusCode == 200) {
    // print(response.body);
    return searchGroups.fromJson(jsonDecode(response.body));
  }
  else{
    throw Exception('Failed to load');
  }
}