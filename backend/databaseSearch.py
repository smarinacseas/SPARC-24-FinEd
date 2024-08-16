from sqlalchemy import create_engine, MetaData, Table, select

#connect to database
db_name = 'initial_fin_db'
host = 'financial-app-db.c92cqe6w64ar.us-east-2.rds.amazonaws.com'
port = '5432'
username = 'postgres'
password = 'Welcome1'
table_name = 'customer_db'
db_url = f'postgresql://{username}:{password}@{host}:{port}/{db_name}'

engine = create_engine(db_url)
metadata = MetaData()
metadata.reflect(bind=engine)
table = metadata.tables.get(table_name)

if table is not None:
    print(f"Columns in table '{table_name}':")
    for column in table.columns: 
        print(f"{column.name} ({column.type})")

    with engine.connect() as connection:
        select_query = select(table)        
        result = connection.execute(select_query)
        rows = result.fetchall()
        print(f"\nData in table '{table_name}':")
        for row in rows:
            print(row)
else:
    print(f"Table '{table_name}' not found in the database.")
    
engine.dispose()