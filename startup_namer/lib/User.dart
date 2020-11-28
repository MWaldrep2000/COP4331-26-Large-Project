class User {
  String login;
  String password;

  User (String login, String password){
    this.login = login;
    this.password = password;
  }

  void SetLogin (String newString) {
    this.login = newString;
  }
}