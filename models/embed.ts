import Discord from 'discord.js';

export interface Embed {
    embed: {
        color?: Discord.ColorResolvable;
        title?:string;
        url?: string;
        author?: Discord.MessageEmbedAuthor
        description?: string;
        thumbnail?: Discord.MessageEmbedThumbnail
        fields?: Discord.EmbedFieldData[];
        image?: Discord.MessageEmbedImage;
        timestamp?: Date | number;
        footer?: Discord.MessageEmbedFooter;
    }
}
