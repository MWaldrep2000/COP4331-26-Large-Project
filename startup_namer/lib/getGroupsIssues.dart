import 'dart:convert';
import 'package:http/http.dart' as http;

class getGroupsIssues{
  var issuesList;
  String error;

  getGroupsIssues({this.issuesList,this.error});

  // factory keyword is used when the constructor doesn't always create an object
  factory getGroupsIssues.fromJson(Map<String, dynamic> json) {
    return getGroupsIssues(
        issuesList: json['Results'],
        error: json['Error']
    );
  }
}

Future<getGroupsIssues> fetchGroupsIssuesResults(String GroupID) async{
  final http.Response response = await http.post(
    'https://hivemindg26.herokuapp.com/api/readIssue',
    headers: <String, String>{
      'Content-Type': 'application/json; charset=UTF-8'
    },
    body: jsonEncode(<dynamic, dynamic>{
      'groupID': GroupID,
    }),
  );

  if (response.statusCode == 200) {
    print("Inside getGroupsIssues");
    print(response.body);
    return getGroupsIssues.fromJson(jsonDecode(response.body));
  }
  else{
    throw Exception('Failed to load');
  }
}