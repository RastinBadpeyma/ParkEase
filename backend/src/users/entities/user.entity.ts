import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Profile } from "../../auth/entities/profile.entity";
import { Reservation } from "../../reservation/entities/reservation.entity";
import { Role } from "../../auth/enums/roles.enum";
import { Expose , Exclude } from "class-transformer";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @Expose()
  id: number;

  @Column({ unique: true })
  @Expose()
  username: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ unique: true })
  @Expose()
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @OneToOne(() => Profile)
  @Expose()
  @JoinColumn()
  profile: Profile;

  
  @Column({ 
    type: 'enum', 
    enum: Role, 
  }) 
  @Expose()
  role: Role;

  @OneToMany(() => Reservation , reservation => reservation.user)
  @Expose()
  reservations: Reservation[];

 
}