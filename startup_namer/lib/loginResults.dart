import 'dart:convert';
import 'package:http/http.dart' as http;

class loginResults{
  final int flag;
  final String email;
  final int validated;
  final String error;
  final String id;

  loginResults({this.flag, this.email, this.validated, this.error, this.id});

  // factory keyword is used when the constructor doesn't always create an object
  factory loginResults.fromJson(Map<String, dynamic> json) {
    return loginResults(
        flag: json['Flag'],
        email: json['Email'],
        validated: json['Validated'],
        error: json['Error'],
        id: json['ID']
    );
  }
}

Future<loginResults> fetchloginResults(String user, String password) async{
  final http.Response response = await http.post(
    'https://hivemindg26.herokuapp.com/api/login',
    headers: <String, String>{
      'Content-Type': 'application/json; charset=UTF-8'
    },
    body: jsonEncode(<String, String>{
      'login' : user,
      'password' : password
    }),
  );

  if (response.statusCode == 200) {
    print(response.body);
    return loginResults.fromJson(jsonDecode(response.body));
  }
  else{
    throw Exception('Failed to load');
  }
}