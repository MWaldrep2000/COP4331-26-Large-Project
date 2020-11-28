import 'dart:convert';

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
        flag: json['flag'],
        email: json['email'],
        validated: json['validated'],
        error: json['error'],
        id: json['id']
    );
  }
}