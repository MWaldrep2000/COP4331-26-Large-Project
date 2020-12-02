import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:localstorage/localstorage.dart';

class issueReplies{
  var replyList;
  String error;

  issueReplies({this.replyList, this.error});

  // factory keyword is used when the constructor doesn't always create an object
  factory issueReplies.fromJson(Map<String, dynamic> json) {
    return issueReplies(
        replyList : json['Results'],
        error: json['Error']
    );
  }
}

Future<issueReplies> fetchissueRepliesResults(String issueID) async{
  final LocalStorage storage = new LocalStorage('data');
  final http.Response response = await http.post(
    'https://hivemindg26.herokuapp.com/api/readReplies',
    headers: <String, String>{
      'Content-Type': 'application/json; charset=UTF-8', 'authorization': storage.getItem('AccessToken')
    },
    body: jsonEncode(<dynamic, dynamic>{
      'issueID': issueID
    }),
  );

  if (response.statusCode == 200) {
    // print(response.body);
    return issueReplies.fromJson(jsonDecode(response.body));
  }
  else{
    throw Exception('Failed to load');
  }
}