const feed = async (root, args, context, info) => {
  const where = args.filter
    ? {
        OR: [
          { description_contains: args.filter },
          { url_contains: args.filter },
        ],
      }
    : {};

  const linksPromise = context.prisma.links({
    where,
    skip: args.skip,
    first: args.first,
    orderBy: args.orderBy,
  });

  const countPromise = context.prisma
    .linksConnection({
      where,
    })
    .aggregate()
    .count();

  const [links, count] = await Promise.all([linksPromise, countPromise]);

  return { links, count };
};

module.exports = {
  feed,
};
