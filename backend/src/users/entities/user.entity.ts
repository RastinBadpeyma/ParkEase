import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Profile } from "../../auth/entities/profile.entity";
import { Reservation } from "../../reservation/entities/reservation.entity";
import { Role } from "src/auth/enums/roles.enum";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ unique: true })
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @OneToOne(() => Profile)
  @JoinColumn()
  profile: Profile;

  
  @Column({ 
    type: 'enum', 
    enum: Role, 
  }) 
  role: Role;

  @OneToMany(() => Reservation , reservation => reservation.user)
  reservations: Reservation[];

 
}