import 'dart:convert';
import 'package:http/http.dart' as http;

class verify{
  String error;

  verify({this.error});

  // factory keyword is used when the constructor doesn't always create an object
  factory verify.fromJson(Map<String, dynamic> json) {
    return verify(
        error: json['Error']
    );
  }
}

Future<verify> fetchverify(String username, String validationCode) async{
  final http.Response response = await http.post(
    'https://hivemindg26.herokuapp.com/api/validateCode',
    headers: <String, String>{
      'Content-Type': 'application/json; charset=UTF-8'
    },
    body: jsonEncode(<dynamic, dynamic>{
      'username': username,
      'validationcode': validationCode
    }),
  );

  if (response.statusCode == 200) {
    // print(response.body);
    return verify.fromJson(jsonDecode(response.body));
  }
  else{
    throw Exception('Failed to load');
  }
}