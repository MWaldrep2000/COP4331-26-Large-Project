import 'dart:convert';

class UserData{
  final String id;
  final String firstName;
  final String lastName;
  final String error;

  UserData({this.id, this.firstName, this.lastName, this.error});

  // factory keyword is used when the constructor doesn't always create an object
  factory UserData.fromJson(Map<String, dynamic> json) {
    return UserData(
      id: json['id'],
      firstName: json['firstName'],
      lastName: json['lastName'],
      error: json['error']
    );
  }
}