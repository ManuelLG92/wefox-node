import * as bcrypt from 'bcrypt';

export class BcryptService {
  static async encryptData(value: string) {
    return await bcrypt.hash(value, await bcrypt.genSalt());
  }

  static async compareEncryptedData(value: string, hash: string) {
    return await bcrypt.compare(value, hash);
  }
}
