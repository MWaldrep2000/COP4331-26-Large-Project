import 'package:http/http.dart' as http;
import 'package:startup_namer/UserData.dart';

class HttpService {
  final String loginUrl = "https://hivemindg26.herokuapp.com/api/login";


  Future<UserData> tryLogin(login, password) async {
    final http.Response response = await http.post(
      ''
    );

    var client = http.Client();

    //var response = await client.get(loginUrl);

    if (response.statusCode == 200){
      var jsonString = response.body;
    }
    else {
      throw Exception('Connection failed');
    }

  }
}