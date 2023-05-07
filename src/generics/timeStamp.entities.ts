import {Column, CreateDateColumn, DeleteDateColumn, UpdateDateColumn} from "typeorm";

export class TimeStampEntities{
    @CreateDateColumn({
        update:false,
    })
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt:Date;

    @DeleteDateColumn()
    deletedAt:Date;
}