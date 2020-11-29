import 'dart:convert';
import 'package:http/http.dart' as http;

class Register{
  final String id;
  final String error;

  Register({this.id, this.error});

  // factory keyword is used when the constructor doesn't always create an object
  factory Register.fromJson(Map<String, dynamic> json) {
    return Register(
        id: json['id'],
        error: json['error']
    );
  }
}

Future<Register> RegisterUser(String username, String password, String email) async{
  final http.Response response = await http.post(
    'https://hivemindg26.herokuapp.com/api/register',
    headers: <String, String>{
      'Content-Type': 'application/json; charset=UTF-8'
    },
    body: jsonEncode(<String, String>{
      'username' : username,
      'password' : password,
      'email' : email
    }),
  );

  if (response.statusCode == 200) {
    print(response.body);
    return Register.fromJson(jsonDecode(response.body));
  }
  else{
    throw Exception('Failed to load album');
  }
}
