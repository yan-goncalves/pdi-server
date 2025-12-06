FROM mcr.microsoft.com/mssql/server:2022-latest

ARG TYPEORM_HOST
ARG TYPEORM_DATABASE
ARG TYPEORM_USERNAME
ARG TYPEORM_PASSWORD
ARG TYPEORM_SA_PASSWORD

ENV TYPEORM_HOST=${TYPEORM_HOST}
ENV TYPEORM_DATABASE=${TYPEORM_DATABASE}
ENV TYPEORM_USERNAME=${TYPEORM_USERNAME}
ENV TYPEORM_PASSWORD=${TYPEORM_PASSWORD}
ENV TYPEORM_SA_PASSWORD=${MSSQL_SA_PASSWORD}

COPY backups /var/opt/mssql/backup
COPY database /var/opt/mssql/database

CMD /bin/bash -c "/opt/mssql/bin/sqlservr & sleep 20 && /opt/mssql-tools/bin/sqlcmd -S $TYPEORM_HOST -U sa -P $TYPEORM_SA_PASSWORD -i /var/opt/mssql/database/db-pdi.sql && wait"
