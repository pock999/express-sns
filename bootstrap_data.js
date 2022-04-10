const dayjs = require('dayjs');

const dbModels = require('./api/models');

module.exports = async () => {
  // User
  const user1 = await dbModels.User.create({
    name: '王小明',
    email: 'ming123@google.com',
    password: 'abcd1234',
  });

  const user2 = await dbModels.User.create({
    name: '陳小華',
    email: 'hua123@hotmail.com',
    password: '1qweoops123',
  });

  // Tag
  const tag1 = await dbModels.Tag.create({
    code: 'life',
    name: '生活',
  });

  const tag2 = await dbModels.Tag.create({
    code: '3c',
    name: '3C',
  });

  const tag3 = await dbModels.Tag.create({
    code: 'food',
    name: '美食',
  });

  const tag4 = await dbModels.Tag.create({
    code: 'joke',
    name: '笑話',
  });

  // Post
  const post1_1 = await dbModels.Post.create({
    title: '標題1',
    content:
      '專大男士配，年全人精什動石、至電站洋。點我作理雲產廣就多內，望費平國、過外長神意黑新教者境了之青應公下院時果會教一士斷關玩入考天新主天要管魚父道山特入趣上者賽此呢當真酒時著態境產家書地火；有或道小一表型像成裡聲評女臺心的發；解發公業當傳去由做笑，樣年望父表然不史代本少呢裝統代當技如醫到護馬臺方個小一去現？城大式座感勢……麼願因水原腦不心那半。林頭位過。位這一是；下國血；可自學，而看研鄉過熱市那應光氣於，子提學上。人對著。',
    UserId: user1.id,
  });

  const post1_2 = await dbModels.Post.create({
    title: '標題2',
    content:
      '提高灣嗎頭後影解；如賣單上生務能現境、美五成身數，示星行門上家石國由聽藝送改了媽竟回該發沒受自充道為，件快現離計心畫講還智常術當做事日理，科親不生。',
    UserId: user1.id,
  });

  const post2_1 = await dbModels.Post.create({
    title: '標題A',
    content:
      '不自一告然著室是人；了在花在的寫水可產巴軍文出在……地畫經風路兒平小雖團合一感這，己山國回進李神那事行溫理我水層。',
    UserId: user2.id,
  });

  // PostTag
  await dbModels.PostTag.create({
    PostId: post1_1.id,
    TagId: tag1.id,
  });

  await dbModels.PostTag.create({
    PostId: post1_1.id,
    TagId: tag3.id,
  });

  await dbModels.PostTag.create({
    PostId: post1_2.id,
    TagId: tag2.id,
  });

  // PostComment
  const postComment1_1_1 = await dbModels.PostComment.create({
    PostId: post1_1.id,
    UserId: user2.id,
    comment: '哈哈哈 真有趣',
  });

  const postComment1_1_2 = await dbModels.PostComment.create({
    PostId: post1_1.id,
    UserId: user1.id,
    comment: '對啊 我也這麼覺得',
    PostCommentId: postComment1_1_1.id,
  });

  const postComment1_2_1 = await dbModels.PostComment.create({
    PostId: post1_2.id,
    comment: '讚',
    UserId: user2.id,
  });

  const postComment2_1_1 = await dbModels.PostComment.create({
    PostId: post2_1.id,
    UserId: user1.id,
    comment: '這很好用嗎？',
  });

  // PostLike
  await dbModels.PostLike.create({
    PostId: post1_1.id,
    UserId: user1.id,
    isLike: 1,
  });
};
