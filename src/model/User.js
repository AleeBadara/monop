// Modele utilisateur

const User = function (name, surname, dateOfBirth, phone, address) {
    this.name = name;
    this.surname = surname;
    this.dateOfBirth = dateOfBirth;
    this.phone = phone;
    this.address = address;
}

module.exports = User;
