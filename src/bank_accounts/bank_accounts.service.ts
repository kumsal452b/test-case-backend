import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateBankAccountDto } from './dto/create-bank_account.dto';
import { UpdateBankAccountDto } from './dto/update-bank_account.dto';
import { Site } from '../schemas/sites.schema';
import { Model, Types } from 'mongoose';
import { BankAccount } from '../schemas/bank_account.schema';
import { Investment } from '../schemas/investments.schema';

@Injectable()
export class BankAccountsService {
  constructor(
    @InjectModel(Site.name) private siteModel: Model<Site>,
    @InjectModel(BankAccount.name) private bankAccountModel: Model<BankAccount>,
    @InjectModel('Team') private teamModel: Model<any>,
    @InjectModel('PaymentMethod')
    private paymentMethodModel: Model<any>,
    @InjectModel('Investment')
    private investmentModel: Model<Investment>,
    @InjectModel('Investor')
    private investorModel: Model<any>,
  ) {}
  async create(createBankAccountDto: CreateBankAccountDto) {
    try {
      const objectId = new Types.ObjectId(createBankAccountDto.site);
      const objectIdTeam = new Types.ObjectId(createBankAccountDto.team);
      const objectIdPaymentMethod = new Types.ObjectId(
        createBankAccountDto.paymentmethods,
      );
      const site = await this.siteModel.findOne({ _id: objectId });
      const team = await this.teamModel.findOne({ _id: objectIdTeam });
      const paymentmethods = await this.paymentMethodModel.findOne({
        _id: objectIdPaymentMethod,
      });
      if (!site) {
        throw new Error('Site not found');
      }
      const BankAccount = new this.bankAccountModel();
      BankAccount.site = site._id;
      BankAccount.team = team._id;
      BankAccount.paymentmethods = paymentmethods._id;
      BankAccount.name = createBankAccountDto.name;
      BankAccount.account_number = createBankAccountDto.account_number;
      BankAccount.daily_limit = createBankAccountDto.daily_limit;
      BankAccount.min_transfer_amount =
        createBankAccountDto.min_transfer_amount;
      BankAccount.max_transfer_amount =
        createBankAccountDto.max_transfer_amount;
      BankAccount.status = createBankAccountDto.status;
      BankAccount.logs.push({
        message: `Bank account created`,
        timestamp: new Date(),
      });
      BankAccount.created = new Date();

      return BankAccount.save();
    } catch (error) {
      console.error('Error while creating bank account:', error);
      throw new Error(error);
    }
  }

  async findAll() {
    try {
      return await this.bankAccountModel
        .find({ deleted: null })
        .populate('site')
        .populate({
          path: 'paymentmethods',
          model: 'PaymentMethod',
        })
        .populate({
          path: 'team',
          model: 'Team',
        })
        .exec();
    } catch (error) {
      console.error('Error while fetching bank accounts:', error);
      throw new Error(error);
    }
  }

  async findOne(id: string) {
    const bankAccount = await this.bankAccountModel
      .findOne({ _id: id, deleted: null })
      .populate('site')
      .populate('paymentmethods')
      .populate('team')
      .exec();
    if (!bankAccount) {
      throw new NotFoundException('Bank account not found.');
    }
    return bankAccount;
  }

  async update(id: string, updateBankAccountDto: UpdateBankAccountDto) {
    const objectId = new Types.ObjectId(id);
    const bankAccount = await this.bankAccountModel.findOne(objectId);
    const site = await this.siteModel.findOne({ _id: objectId });
    const team = await this.siteModel.findOne({ _id: objectId });
    const payment_method = await this.siteModel.findOne({ _id: objectId });
    if (!bankAccount || bankAccount.deleted) {
      throw new NotFoundException('Bank account not found.');
    }

    if (updateBankAccountDto.name) {
      bankAccount.name = updateBankAccountDto.name;
      bankAccount.site = updateBankAccountDto.site;
      bankAccount.team = updateBankAccountDto.team;
      bankAccount.paymentmethods = updateBankAccountDto.paymentmethods;
      bankAccount.name = updateBankAccountDto.name;
      bankAccount.account_number = updateBankAccountDto.account_number;
      bankAccount.daily_limit = updateBankAccountDto.daily_limit;
      bankAccount.min_transfer_amount =
        updateBankAccountDto.min_transfer_amount;
      bankAccount.max_transfer_amount =
        updateBankAccountDto.max_transfer_amount;
      bankAccount.status = updateBankAccountDto.status;
      bankAccount.updated = new Date();
      bankAccount.logs.push({
        message: `Bank account updated `,
        timestamp: new Date(),
      });
    }
    const updatedBankAccount = await bankAccount.save();

    return updatedBankAccount;
  }

  async remove(id: string) {
    const objectId = new Types.ObjectId(id);
    try {
      if (!this.bankAccountModel.findById(objectId)) {
        throw new NotFoundException('Bank account not found.');
      }

      return await this.bankAccountModel
        .findByIdAndUpdate(objectId, {
          deleted: new Date(),
        })
        .exec();
    } catch (error) {
      console.error('Error while deleting bank account:', error);
      throw new Error(error);
    }
  }

  async updateStatus(id: string, status: string) {
    const objectId = new Types.ObjectId(id);
    const stat = Number(status);
    const bankAccount = await this.bankAccountModel.findOne(objectId);
    if (!bankAccount || bankAccount.deleted) {
      throw new NotFoundException('Bank account not found.');
    }
    bankAccount.status = stat;
    bankAccount.updated = new Date();
    bankAccount.logs.push({
      message: `Bank account status updated to ${status}`,
      timestamp: new Date(),
    });
    return await bankAccount.save();
  }

  async logout(id: string) {
    const objectId = new Types.ObjectId(id);
    const bankAccount = await this.bankAccountModel.findOne(objectId);
    if (!bankAccount || bankAccount.deleted) {
      throw new NotFoundException('Bank account not found.');
    }
    bankAccount.login = 0;
    bankAccount.login_user = null;
    bankAccount.login_username = null;
    bankAccount.resume = 0;
    bankAccount.updated = new Date();
    bankAccount.logs.push({
      message: `Bank account logout`,
      timestamp: new Date(),
    });
    return await bankAccount.save();
  }

  async updateResume(id: string, status: string) {
    const objectId = new Types.ObjectId(id);
    const stat = Number(status);
    const bankAccount = await this.bankAccountModel.findOne(objectId);
    if (!bankAccount || bankAccount.deleted) {
      throw new NotFoundException('Bank account not found.');
    }
    bankAccount.resume = stat;
    bankAccount.updated = new Date();
    bankAccount.logs.push({
      message: `Bank account resume updated to ${status}`,
      timestamp: new Date(),
    });
    return await bankAccount.save();
  }

  async updateLogin(
    id: string,
    status: string,
    user: string,
    username: string,
  ) {
    const objectId = new Types.ObjectId(id);
    const stat = Number(status);
    const user_id = Number(user);
    const bankAccount = await this.bankAccountModel.findOne(objectId);
    if (!bankAccount || bankAccount.deleted) {
      throw new NotFoundException('Bank account not found.');
    }
    bankAccount.login = stat;
    bankAccount.login_user = user_id;
    bankAccount.login_username = username;
    bankAccount.updated = new Date();
    bankAccount.logs.push({
      message: `Bank account login updated to ${status}`,
      timestamp: new Date(),
    });
    return await bankAccount.save();
  }

  async getLoginnedAccount(user: string) {
    const bankAccount = await this.bankAccountModel
      .find({ login_user: user, resume: 1 })
      .populate('site')
      .populate('paymentmethods')
      .exec();
    return bankAccount;
  }

  async getDetails(id: string) {
    const objectId = new Types.ObjectId(id);
    const bankAccount = await this.bankAccountModel
      .findOne(objectId)
      .populate('site')
      .populate('paymentmethods')
      .exec();
    return bankAccount;
  }

  async updateDetails(id: string, update: any) {
    const replaceTurkishCharacters = (text) => {
      const characterMappings = {
        ç: 'c',
        ğ: 'g',
        ı: 'i',
        ö: 'o',
        ş: 's',
        ü: 'u',
        Ç: 'C',
        Ğ: 'G',
        İ: 'I',
        Ö: 'O',
        Ş: 'S',
        Ü: 'U',
      };

      let correctedText = text;

      for (const originalChar in characterMappings) {
        const newChar = characterMappings[originalChar];
        const regex = new RegExp(originalChar, 'g');
        correctedText = correctedText.replace(regex, newChar);
      }
      return correctedText.toLowerCase();
    };
    const objectId = new Types.ObjectId(id);
    const account = await this.bankAccountModel.findOne(objectId);
    if (!account || account.deleted) {
      throw new NotFoundException('Bank account not found.');
    }

    const existingDetails = account.details.map((detail) => {
      return `${detail.user_name}-${detail.amount}-${detail.last_balance}-${detail.created_bank}`;
    });

    for (const item of update) {
      const itemSummary = `${item.user_name}-${item.amount}-${item.last_balance}-${item.created_bank}`;

      if (!existingDetails.includes(itemSummary)) {
        account.details.push(item);
        const bankId = new Types.ObjectId(item.bank_id);
        const bank = await this.bankAccountModel.findOne(bankId);
        const user = replaceTurkishCharacters(item.user_name);
        const userNameKeywords = user.split(' ').join('.*?');

        const regex = new RegExp(userNameKeywords, 'i');
        const investor = await this.investorModel.findOne({
          user_name: { $regex: regex },
        });
        const investment = await this.investmentModel
          .find({
            bank_account: bank._id,
            status: 0,
            user: investor._id,
            amount: item.amount,
          })
          .populate('user')
          .exec();
        if (investment.length > 0) {
          investment[0].status = 1;
          investment[0].save();
          return {
            message: 'Bank account details updated',
          };
        }
      }
    }

    if (update.length > 0) {
      account.updated = new Date();
      account.logs.push({
        message: 'Bank account details updated',
        timestamp: new Date(),
      });
      await account.save();
    } else {
      return {
        message: 'No changes detected',
      };
    }

    return account;
  }
}
