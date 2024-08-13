import { ApiProperty } from '@nestjs/swagger';

export class QualityMeasureDto {
  @ApiProperty({
    required: false,
    description:
      'Nome do projeto, enviar o nome do projeto igual está no sonar. Pode ser enviado só um pedaço no nome. Ex: insper, omni',
  })
  projectKeyName?: string;

  @ApiProperty({
    required: false,
    description: 'IDs dos projetos separados por vírgula',
  })
  projectKeys?: string;

  @ApiProperty({
    required: false,
    description:
      'Sonar URL do projeto - Senão passar, vamos utilizar https://sonarhomolog.db1.com.br',
  })
  sonarUrl?: string;

  @ApiProperty({
    required: false,
    description:
      'User token do sonar para conseguir buscar os dados dentro do sonar - Senão passar, vamos utilizar o token do sonar homolog',
  })
  sonarUserToken?: string;
}
