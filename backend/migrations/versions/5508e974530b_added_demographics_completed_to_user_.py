"""Added demographics_completed to User model

Revision ID: 5508e974530b
Revises: 
Create Date: 2024-08-15 14:26:56.196712

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '5508e974530b'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('customer_db', schema=None) as batch_op:
        batch_op.alter_column('first_name',
               existing_type=sa.VARCHAR(length=50),
               nullable=False)
        batch_op.alter_column('last_name',
               existing_type=sa.VARCHAR(length=50),
               nullable=False)
        batch_op.drop_column('module5')
        batch_op.drop_column('module6')
        batch_op.drop_column('module4')
        batch_op.drop_column('module3')
        batch_op.drop_column('module1')
        batch_op.drop_column('module7')
        batch_op.drop_column('module2')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('customer_db', schema=None) as batch_op:
        batch_op.add_column(sa.Column('module2', sa.INTEGER(), autoincrement=False, nullable=True))
        batch_op.add_column(sa.Column('module7', sa.INTEGER(), autoincrement=False, nullable=True))
        batch_op.add_column(sa.Column('module1', sa.INTEGER(), autoincrement=False, nullable=True))
        batch_op.add_column(sa.Column('module3', sa.INTEGER(), autoincrement=False, nullable=True))
        batch_op.add_column(sa.Column('module4', sa.INTEGER(), autoincrement=False, nullable=True))
        batch_op.add_column(sa.Column('module6', sa.INTEGER(), autoincrement=False, nullable=True))
        batch_op.add_column(sa.Column('module5', sa.INTEGER(), autoincrement=False, nullable=True))
        batch_op.alter_column('last_name',
               existing_type=sa.VARCHAR(length=50),
               nullable=True)
        batch_op.alter_column('first_name',
               existing_type=sa.VARCHAR(length=50),
               nullable=True)

    # ### end Alembic commands ###
