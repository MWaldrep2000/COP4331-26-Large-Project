import 'dart:convert';

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