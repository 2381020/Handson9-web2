import { ConfigurableModuleBuilder, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }),
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
      type: 'postgres',
      host: configService.get<string>('POSTGRES_HOST'),
      port: configService.get<string>('POSTGRES_HOST')
        ? configService.get<number>('POSTGRES_PORT')
        : 5432,
      password: configService.get<string>('POSTGRES_PASSWORD'),
      username: configService.get<string>('POSTGRES_USER'),
      database: configService.get<string>('POSTGRES_DATABASE'),
      migrations: ['dist/migration/*.js'],
      entities: [__dirname + '/**/*entity{.ts,.js}'],
      autoLoadEntities: true,
      ssl: true
    }),
  }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
