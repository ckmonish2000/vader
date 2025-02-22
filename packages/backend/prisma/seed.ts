import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const commands = await prisma.command.createMany({
    data: [
      {
          title: 'Get OS Information',
          cmd: 'uname -s && uname -r && uname -m',
          type: 'DEFAULT'
      },
      {
          title: 'Get CPU Information',
          cmd: 'lscpu | grep "Model name"',
          type: 'DEFAULT'
      },
      {
          title: 'Get Memory Usage',
          cmd: 'free -h | grep Mem | awk \'{print $3 "/" $2}\'',
          type: 'DEFAULT'
      },
      {
          title: 'Get Disk Usage',
          cmd: 'df -h / | grep / | awk \'{print $3 "/" $2 " (" $5 " used)"}\'',
          type: 'DEFAULT'
      },
      {
          title: 'Get Node.js Version',
          cmd: 'node -v',
          type: 'DEFAULT'
      },
      {
          title: 'Get NPM Version',
          cmd: 'npm -v',
          type: 'DEFAULT'
      },
      {
          title: 'Get Installed Dependencies',
          cmd: 'jq -r \'.dependencies | to_entries | map("\\(.key)@\\(.value)") | .[]\' package.json',
          type: 'DEFAULT'
      },
      {
          title: 'Get Shell Information',
          cmd: '$SHELL --version',
          type: 'DEFAULT'
      }
  ],
  });
  console.log({ commands });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
