import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './schemas/product.schema';
import { ProductRespository } from './repositories/product.respository';
import { ProductMongooseRepository } from './repositories/mongoose/product.mongoose.repository';
import { StockService } from './services/stock.service';
import { StockController } from './controllers/stock.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
  controllers: [StockController],
  providers: [
    { provide: ProductRespository, useClass: ProductMongooseRepository },
    StockService,
  ],
})
export class StockModule {}
