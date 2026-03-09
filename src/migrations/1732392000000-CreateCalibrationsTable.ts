import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey, TableIndex } from 'typeorm'

export class CreateCalibrationsTable1732392000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create calibrations table
    await queryRunner.createTable(
      new Table({
        name: 'calibrations',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment'
          },
          {
            name: 'id_performed_evaluation',
            type: 'int',
            isNullable: false
          },
          {
            name: 'original_grade',
            type: 'decimal',
            precision: 4,
            scale: 2,
            isNullable: false
          },
          {
            name: 'calibration_value',
            type: 'decimal',
            precision: 4,
            scale: 2,
            isNullable: false
          },
          {
            name: 'final_grade',
            type: 'decimal',
            precision: 4,
            scale: 2,
            isNullable: false
          },
          {
            name: 'comment',
            type: 'text',
            isNullable: false
          },
          {
            name: 'id_manager',
            type: 'int',
            isNullable: false
          },
          {
            name: 'created_at',
            type: 'datetime',
            default: 'GETDATE()'
          },
          {
            name: 'updated_at',
            type: 'datetime',
            default: 'GETDATE()'
          }
        ]
      }),
      true
    )

    // Create unique index on id_performed_evaluation
    await queryRunner.createIndex(
      'calibrations',
      new TableIndex({
        name: 'IDX_CALIBRATIONS_PERFORMED_EVALUATION',
        columnNames: ['id_performed_evaluation'],
        isUnique: true
      })
    )

    // Create foreign key to performed_evaluations
    await queryRunner.createForeignKey(
      'calibrations',
      new TableForeignKey({
        name: 'FK_CALIBRATIONS_PERFORMED_EVALUATION',
        columnNames: ['id_performed_evaluation'],
        referencedTableName: 'performed_evaluations',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE'
      })
    )

    // Create foreign key to users (manager)
    await queryRunner.createForeignKey(
      'calibrations',
      new TableForeignKey({
        name: 'FK_CALIBRATIONS_MANAGER',
        columnNames: ['id_manager'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        onDelete: 'NO ACTION'
      })
    )

    // Add is_calibrated column to performed_evaluations
    await queryRunner.addColumn(
      'performed_evaluations',
      new TableColumn({
        name: 'is_calibrated',
        type: 'bit',
        default: 0,
        isNullable: false
      })
    )

    // Drop old calibration columns from performed_evaluations if they exist
    const table = await queryRunner.getTable('performed_evaluations')
    const calibrationValueColumn = table?.findColumnByName('calibration_value')
    const calibrationJustificationColumn = table?.findColumnByName('calibration_justification')

    if (calibrationValueColumn) {
      await queryRunner.dropColumn('performed_evaluations', 'calibration_value')
    }

    if (calibrationJustificationColumn) {
      await queryRunner.dropColumn('performed_evaluations', 'calibration_justification')
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop foreign keys
    await queryRunner.dropForeignKey('calibrations', 'FK_CALIBRATIONS_MANAGER')
    await queryRunner.dropForeignKey('calibrations', 'FK_CALIBRATIONS_PERFORMED_EVALUATION')

    // Drop index
    await queryRunner.dropIndex('calibrations', 'IDX_CALIBRATIONS_PERFORMED_EVALUATION')

    // Drop calibrations table
    await queryRunner.dropTable('calibrations')

    // Drop is_calibrated column from performed_evaluations
    await queryRunner.dropColumn('performed_evaluations', 'is_calibrated')

    // Restore old calibration columns
    await queryRunner.addColumn(
      'performed_evaluations',
      new TableColumn({
        name: 'calibration_value',
        type: 'float',
        isNullable: true
      })
    )

    await queryRunner.addColumn(
      'performed_evaluations',
      new TableColumn({
        name: 'calibration_justification',
        type: 'nvarchar',
        length: 'MAX',
        isNullable: true
      })
    )
  }
}

