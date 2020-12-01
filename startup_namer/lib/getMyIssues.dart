import 'dart:convert';
import 'package:http/http.dart' as http;

class getMyIssues{
  var issuesList;
  String error;

  getMyIssues({this.issuesList,this.error});

  // factory keyword is used when the constructor doesn't always create an object
  factory getMyIssues.fromJson(Map<String, dynamic> json) {
    return getMyIssues(
        issuesList: json['Results'],
        error: json['Error']
    );
  }
}

Future<getMyIssues> fetchMyIssuesResults(String username) async{
  final http.Response response = await http.post(
    'https://hivemindg26.herokuapp.com/api/readAllIssues',
    headers: <String, String>{
      'Content-Type': 'application/json; charset=UTF-8'
    },
    body: jsonEncode(<dynamic, dynamic>{
      'username': username,
    }),
  );

  if (response.statusCode == 200) {
    print(response.body);
    return getMyIssues.fromJson(jsonDecode(response.body));
  }
  else{
    throw Exception('Failed to load');
  }
}