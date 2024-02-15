import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Investment } from '../schemas/investments.schema';
import { updateInvestmentDto } from './dto/update-investment.dto';
import { updateBankInvestmentDto } from './dto/update-bank-investment.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
@Injectable()
export class InvestmentsService {
  constructor(
    @InjectModel(Investment.name) private investmentModel: Model<Investment>,
    private eventEmitter: EventEmitter2,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(
    page: number = 1,
    itemsPerPage: number = 10,
    group_id: number,
    site_id: number,
    user: any,
  ): Promise<{ data: Investment[]; totalPages: number; currentPage: any }> {
    page = parseInt(page as any);
    itemsPerPage = parseInt(itemsPerPage as any);
    if (isNaN(page) || isNaN(itemsPerPage)) {
      throw new BadRequestException('Invalid query params');
    }
    const skipAmount = (page - 1) * itemsPerPage;
    let theConditions = {};
    if (group_id !== 0) {
      theConditions = { team: group_id };
    } else if (site_id !== 0) {
      theConditions = { site: site_id };
    }
    let theUser = {};
    if (user.site) {
      const site = new Types.ObjectId(user.site);
      theUser = { site: site };
    }
    if (user.group) {
      const group = new Types.ObjectId(user.group);
      theUser = { team: group };
    }
    try {
      const [data, totalCount] = await Promise.all([
        this.investmentModel
          .find(theUser)
          .skip(skipAmount)
          .limit(itemsPerPage)
          .populate('site')
          .populate('user')
          .populate('team')
          .populate('bank_account')
          .populate('payment_method')
          .sort({ created: -1 })
          .exec(),
        this.investmentModel.countDocuments(),
      ]);

      const totalPages = Math.ceil(totalCount / itemsPerPage);

      return {
        data,
        totalPages,
        currentPage: theUser,
      };
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
  async findAllPending(
    page: number = 1,
    itemsPerPage: number = 10,
    group_id: number,
    site_id: number,
    user: any,
  ): Promise<{ data: Investment[]; totalPages: number; currentPage: any }> {
    page = parseInt(page as any);
    itemsPerPage = parseInt(itemsPerPage as any);
    if (isNaN(page) || isNaN(itemsPerPage)) {
      throw new BadRequestException('Invalid query params');
    }
    const skipAmount = (page - 1) * itemsPerPage;
    let theConditions = {};
    if (group_id !== 0) {
      theConditions = { team: group_id };
    } else if (site_id !== 0) {
      theConditions = { site: site_id };
    }
    let theUser = {};
    if (user.site) {
      const site = new Types.ObjectId(user.site);
      theUser = { site: site };
    }
    if (user.group) {
      const group = new Types.ObjectId(user.group);
      theUser = { team: group };
    }
    try {
      const [data, totalCount] = await Promise.all([
        this.investmentModel
          .find(theUser)
          .where({ status: 0 })
          .skip(skipAmount)
          .limit(itemsPerPage)
          .populate('site')
          .populate('user')
          .populate('team')
          .populate('bank_account')
          .populate('payment_method')
          .sort({ created: -1 })
          .exec(),
        this.investmentModel.countDocuments(),
      ]);

      const totalPages = Math.ceil(totalCount / itemsPerPage);

      return {
        data,
        totalPages,
        currentPage: theUser,
      };
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
  async findAllPaid(
    page: number = 1,
    itemsPerPage: number = 10,
    group_id: number,
    site_id: number,
    user: any,
  ): Promise<{ data: Investment[]; totalPages: number; currentPage: any }> {
    page = parseInt(page as any);
    itemsPerPage = parseInt(itemsPerPage as any);
    if (isNaN(page) || isNaN(itemsPerPage)) {
      throw new BadRequestException('Invalid query params');
    }
    const skipAmount = (page - 1) * itemsPerPage;
    let theConditions = {};
    if (group_id !== 0) {
      theConditions = { team: group_id };
    } else if (site_id !== 0) {
      theConditions = { site: site_id };
    }
    let theUser = {};
    if (user.site) {
      const site = new Types.ObjectId(user.site);
      theUser = { site: site };
    }
    if (user.group) {
      const group = new Types.ObjectId(user.group);
      theUser = { team: group };
    }
    try {
      const [data, totalCount] = await Promise.all([
        this.investmentModel
          .find(theUser)
          .where({ status: 1 })
          .skip(skipAmount)
          .limit(itemsPerPage)
          .populate('site')
          .populate('user')
          .populate('team')
          .populate('bank_account')
          .populate('payment_method')
          .sort({ created: -1 })
          .exec(),
        this.investmentModel.countDocuments(),
      ]);

      const totalPages = Math.ceil(totalCount / itemsPerPage);

      return {
        data,
        totalPages,
        currentPage: theUser,
      };
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
  async findAllUnPaid(
    page: number = 1,
    itemsPerPage: number = 10,
    group_id: number,
    site_id: number,
    user: any,
  ): Promise<{ data: Investment[]; totalPages: number; currentPage: any }> {
    page = parseInt(page as any);
    itemsPerPage = parseInt(itemsPerPage as any);
    if (isNaN(page) || isNaN(itemsPerPage)) {
      throw new BadRequestException('Invalid query params');
    }
    const skipAmount = (page - 1) * itemsPerPage;
    let theConditions = {};
    if (group_id !== 0) {
      theConditions = { team: group_id };
    } else if (site_id !== 0) {
      theConditions = { site: site_id };
    }
    let theUser = {};
    if (user.site) {
      const site = new Types.ObjectId(user.site);
      theUser = { site: site };
    }
    if (user.group) {
      const group = new Types.ObjectId(user.group);
      theUser = { team: group };
    }
    try {
      const [data, totalCount] = await Promise.all([
        this.investmentModel
          .find(theUser)
          .where({ status: 2 })
          .skip(skipAmount)
          .limit(itemsPerPage)
          .populate('site')
          .populate('user')
          .populate('team')
          .populate('bank_account')
          .populate('payment_method')
          .sort({ created: -1 })
          .exec(),
        this.investmentModel.countDocuments(),
      ]);

      const totalPages = Math.ceil(totalCount / itemsPerPage);

      return {
        data,
        totalPages,
        currentPage: theUser,
      };
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
  async getBankAccountDailyInvestmentTotal(
    bank_account_id: string,
  ): Promise<any> {
    try {
      const bank_account = new Types.ObjectId(bank_account_id);
      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0);
      const start = new Date(currentDate);
      currentDate.setHours(23, 59, 59, 999);
      const end = new Date(currentDate);
      const data = await this.investmentModel
        .aggregate([
          {
            $match: {
              bank_account: bank_account,
              created: {
                $gte: start,
                $lte: end,
              },
              status: 1,
            },
          },
          {
            $group: {
              _id: {
                bank_account: '$bank_account',
              },
              total: {
                $sum: '$amount',
              },
            },
          },
        ])
        .exec();

      return data;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async findPartialReport(
    group_id: number,
    site_id: number,
    RType: string,
    customDate: string,
  ) {
    var start: Date;
    var end: Date;
    if (RType === 'daily') {
      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0);
      start = new Date(currentDate);
      currentDate.setHours(23, 59, 59, 999);
      end = new Date(currentDate);
    } else if (RType === 'weekly') {
      const suAnkiTarih = new Date();
      const gun = suAnkiTarih.getDay();
      start = new Date(suAnkiTarih);
      start.setDate(suAnkiTarih.getDate() - gun + (gun === 0 ? -6 : 1));
      start.setHours(0, 0, 0, 0);
      end = new Date(start);
      end.setDate(start.getDate() + 6);
      end.setHours(23, 59, 59, 999);
    } else if (RType === 'monthly') {
      const currentDate = new Date();
      start = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
      start.setHours(0, 0, 0, 0);
      end = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
      end.setHours(23, 59, 59, 999);
    } else if (RType === 'custom') {
      let theDates = customDate.split('SEPE');
      start = new Date(theDates[0]);
      end = new Date(theDates[1]);
    }
    let theConditions = {};
    if (group_id !== 0) {
      theConditions = { team: group_id };
    } else if (site_id !== 0) {
      theConditions = { site: site_id };
    }
    try {
      const data = await this.investmentModel
        .aggregate([
          {
            $match: {
              created: {
                $gte: start,
                $lte: end,
              },
            },
          },
          {
            $lookup: {
              from: 'sites',
              localField: 'site',
              foreignField: '_id',
              as: 'st',
            },
          },
          {
            $lookup: {
              from: 'teams',
              localField: 'team',
              foreignField: '_id',
              as: 'tm',
            },
          },

          {
            $group: {
              _id: {
                site: '$st',
                team: '$tm',
              },
              total: {
                $sum: '$amount',
              },
            },
          },
        ])
        .exec();

      return {
        data,
      };
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async update(
    id: string,
    updateInvestmentDto: updateInvestmentDto,
  ): Promise<Investment> {
    try {
      const investment = await this.investmentModel.findById(id).exec();

      if (!investment) {
        throw new NotFoundException(`Investment with ID ${id} not found`);
      }

      if (investment.status !== updateInvestmentDto.status) {
        investment.status = updateInvestmentDto.status;
        if (updateInvestmentDto.amount) {
          investment.amount = updateInvestmentDto.amount;
        }
        await investment.save();
      } else {
        throw new BadRequestException('Status is the same');
      }

      investment.logs.push({
        message: `Investment status changed to ${updateInvestmentDto.status}`,
        timestamp: new Date(),
      });

      const sendInvestment = await this.investmentModel
        .find(investment._id)
        .populate('site')
        .populate('user')
        .populate('team')
        .populate('bank_account')
        .populate('payment_method')
        .exec();
      this.eventEmitter.emit('updateInvestment', {
        investment: sendInvestment,
        type:
          investment.status == 1
            ? 'status-success'
            : investment.status == 2
            ? 'status-failed'
            : 'status-pending',
      });
      return investment;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updateBank(
    id: string,
    updateInvestmentDto: updateBankInvestmentDto,
  ): Promise<Investment> {
    try {
      const investment = await this.investmentModel.findById(id).exec();

      if (!investment) {
        throw new NotFoundException(`Investment with ID ${id} not found`);
      }

      if (!investment.bank_account && updateInvestmentDto.bank_account) {
        investment.bank_account = new Types.ObjectId(
          updateInvestmentDto.bank_account,
        );
        await investment.save();
      } else {
        throw new BadRequestException('Status is the same');
      }

      investment.logs.push({
        message: `Investment bank account changed to ${updateInvestmentDto.bank_account}`,
        timestamp: new Date(),
      });

      await investment.save();
      const sendInvestment = await this.investmentModel
        .find(investment._id)
        .populate('site')
        .populate('user')
        .populate('team')
        .populate('bank_account')
        .populate('payment_method')
        .exec();
      this.eventEmitter.emit('updateInvestment', {
        investment: sendInvestment,
        type: 'bank',
      });
      return investment;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
