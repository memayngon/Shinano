import { Guild, MessageAttachment, MessageEmbed } from "discord.js"
import { toTitleCase } from "./Utils"
import { TextChannel } from "discord.js"
import t2c from 'table2canvas'
import { Canvas } from "canvas"
import { client } from ".."

// Stats Formatting
export function gearStats(gearStats, embed) {
    for (let stat in gearStats) {
        let name: string 
        let st = gearStats[stat].formatted // Stats of {name}

        switch (stat.toLowerCase()) {
            case 'antiair':
                name = 'Anti-Air:'
                break
            case 'volleytime':
                name = 'Volley Time:'
                break
            case 'rateoffire':
                name = 'Rate of Fire:'
                break
            case 'opsdamageboost':
                name = 'OPS Damage Boost'
                break
            case 'ammotype':
                name = 'Ammo Type:'
                break
            case 'planehealth': 
                name = 'Plane\'s Health:'
                break
            case 'dodgelimit':
                name = 'Dodge Limit:'
                break
            case 'crashdamage':
                name = 'Crash Damage:'
                break
            case 'nooftorpedoes':
                name = 'Number of Torpedoes:'
                break
            case 'aaguns': {
                let guns: string[] = []

                gearStats[stat].stats.forEach((unit) => {
                    guns.push(unit.formatted)
                })

                name = 'AA Guns'
                st = guns.join('\n')

                break
            }
            case 'ordnance': {
                let ordnances: string[] = []

                gearStats[stat].stats.forEach((unit) => {
                    ordnances.push(unit.formatted)
                })

                name = toTitleCase(stat) + ':'
                st = ordnances.join('\n')

                break
            }
            default: { 
                name = toTitleCase(stat) + ':'
                break
            }
        } 

        embed.addField(name, st)
    }    
}


// Gear Equippable 
export function gearFits(fits) {
    const fitted: string[] = []
    for (let ship in fits) {
        if (fits[ship] !== null) {
            const slot = toTitleCase(fits[ship])
            switch (ship.toLowerCase()) {
                case 'destroyer':
                    fitted.push(`Destroyer: ${slot}`)
                    break
                case 'lightcruiser':
                    fitted.push(`Light Cruiser: ${slot}`)
                    break
                case 'heavycruiser':
                    fitted.push(`Heavy Cruiser: ${slot}`)
                    break
                case 'monitor':
                    fitted.push(`Monitor: ${slot}`)
                    break
                case 'largecruiser':
                    fitted.push(`Large Cruiser: ${slot}`)
                    break
                case 'battleship':
                    fitted.push(`Battleship: ${slot}`)
                    break
                case 'battlecruiser':
                    fitted.push(`Battlecruiser: ${slot}`)
                    break
                case 'aviationbattleship':
                    fitted.push(`Aviation Battleship: ${slot}`)
                    break
                case 'lightcarrier':
                    fitted.push(`Light Carrier: ${slot}`)
                    break
                case 'aircraftcarrier':
                    fitted.push(`Aircraft Carrier: ${slot}`)
                    break
                case 'repairship':
                    fitted.push(`Repair Ship: ${slot}`)
                    break
                case 'munitionship':
                    fitted.push(`Munition Ship: ${slot}`)
                    break
                case 'submarine':
                    fitted.push(`Submarine: ${slot}`)
                    break
                case 'submarinecarrier':
                    fitted.push(`Submarine Carrier: ${slot}`)
                    break
            }
        }
    }

    return fitted
}


// Chapter
export function chapterInfo(chapterInfo, chapterMode) {
    const levels: MessageEmbed[] = []
    const title = `Chapter ${chapterInfo.id}: ${chapterInfo.names.en}`
    
    for (let i = 1; i-1 < 4; i++) {
        const blueprints: string[] = []

        chapterInfo[i][chapterMode].blueprintDrops.forEach((blueprint) => {
            const name = blueprint.tier + ' ' + blueprint.name
            blueprints.push(name)
        })

        levels.push(
            new MessageEmbed()
                .setColor(chapterMode === 'normal' ? 'BLUE' : 'RED')
                .setTitle(`${title} | ${chapterInfo[i][chapterMode].code}`)
                .setDescription(
                    `**${chapterInfo[i][chapterMode].title}**\n` +
                    `*${chapterInfo[i][chapterMode].introduction}*`
                )
                .addFields(
                    {name: 'Unlock Requirements:', value: `${chapterInfo[i][chapterMode].unlockRequirements.text}`, inline: false},

                    {name: 'Airspace Control:', value: 
                    `Actual: ${chapterInfo[i][chapterMode].airspaceControl.actual  ? chapterInfo[i][chapterMode].airspaceControl.actual : 'N/A'}\n` +
                    `Denial: ${chapterInfo[i][chapterMode].airspaceControl.denial ? chapterInfo[i][chapterMode].airspaceControl.denial : 'N/A'}\n` +
                    `Parity: ${chapterInfo[i][chapterMode].airspaceControl.parity  ? chapterInfo[i][chapterMode].airspaceControl.parity : 'N/A'}\n` +
                    `Superiority: ${chapterInfo[i][chapterMode].airspaceControl.superiority ? chapterInfo[i][chapterMode].airspaceControl.superiority : 'N/A'}\n` +
                    `Supremacy: ${chapterInfo[i][chapterMode].airspaceControl.supremacy ? chapterInfo[i][chapterMode].airspaceControl.supremacy : 'N/A'}`, inline: false},

                    {name: 'Base XP:', value: 
                    `**Small Fleet**: ${chapterInfo[i][chapterMode].baseXP.smallFleet}\n` +
                    `**Medium Fleet**: ${chapterInfo[i][chapterMode].baseXP.mediumFleet}\n` +
                    `**Large Fleet**: ${chapterInfo[i][chapterMode].baseXP.largeFleet}\n` +
                    `**Boss Fleet**: ${chapterInfo[i][chapterMode].baseXP.bossFleet}`, inline: true},

                    {name: 'Enemies Level:', value: 
                    `**Mob Level**: ${chapterInfo[i][chapterMode].enemyLevel.mobLevel}\n` +
                    `**Boss Level**: ${chapterInfo[i][chapterMode].enemyLevel.bossLevel}\n` +
                    `**Boss Ship**: ${chapterInfo[i][chapterMode].enemyLevel.boss}`, inline: true},

                    {name: 'Required Battles:', value: 
                    `**Battles Before Boss**: ${chapterInfo[i][chapterMode].requiredBattles}\n` +
                    `**Boss Battles For 100%**: ${chapterInfo[i][chapterMode].bossKillsToClear}`, inline: true},

                    {name: 'Drops:', value: chapterInfo[i][chapterMode].mapDrops.join('\n'), inline: true},
                    {name: 'Blueprints:', value: blueprints.length > 0 ? blueprints.join('\n') : 'None', inline: true}
                )
        )
    }

    return levels;
}


// Stats Table 
export async function generateStatsTable(shipStats) {
    // Fetching Channel
    const guild: Guild = await client.guilds.fetch('1002188088942022807')
    const channel = await guild.channels.fetch('1022191350835331203')


    // Structure
    const columns: any = [
        {title: 'LVL', dataIndex: 'LVL', textAlign: 'center', textColor: 'rgba(255, 255, 255, 1)', titleColor: 'rgba(255, 255, 255, 1)', titleFontSize: '29px', textFontSize: '29px'},
        {title: 'HP', dataIndex: 'HP', textAlign: 'center', textColor: 'rgba(255, 255, 255, 1)', titleColor: 'rgba(255, 255, 255, 1)', titleFontSize: '29px', textFontSize: '29px'},
        {title: 'RLD', dataIndex: 'RLD', textAlign: 'center', textColor: 'rgba(255, 255, 255, 1)', titleColor: 'rgba(255, 255, 255, 1)', titleFontSize: '29px', textFontSize: '29px'},
        {title: 'LCK', dataIndex: 'LCK', textAlign: 'center', textColor: 'rgba(255, 255, 255, 1)', titleColor: 'rgba(255, 255, 255, 1)', titleFontSize: '29px', textFontSize: '29px'},
        {title: 'FP', dataIndex: 'FP', textAlign: 'center', textColor: 'rgba(255, 255, 255, 1)', titleColor: 'rgba(255, 255, 255, 1)', titleFontSize: '29px', textFontSize: '29px'},
        {title: 'TRP', dataIndex: 'TRP', textAlign: 'center', textColor: 'rgba(255, 255, 255, 1)', titleColor: 'rgba(255, 255, 255, 1)', titleFontSize: '29px', textFontSize: '29px'},
        {title: 'EVA', dataIndex: 'EVA', textAlign: 'center', textColor: 'rgba(255, 255, 255, 1)', titleColor: 'rgba(255, 255, 255, 1)', titleFontSize: '29px', textFontSize: '29px'},
        {title: 'SPD', dataIndex: 'SPD', textAlign: 'center', textColor: 'rgba(255, 255, 255, 1)', titleColor: 'rgba(255, 255, 255, 1)', titleFontSize: '29px', textFontSize: '29px'},
        {title: 'AA', dataIndex: 'AA', textAlign: 'center', textColor: 'rgba(255, 255, 255, 1)', titleColor: 'rgba(255, 255, 255, 1)', titleFontSize: '29px', textFontSize: '29px'},
        {title: 'AVI', dataIndex: 'AVI', textAlign: 'center', textColor: 'rgba(255, 255, 255, 1)', titleColor: 'rgba(255, 255, 255, 1)', titleFontSize: '29px', textFontSize: '29px'},
        {title: 'OIL', dataIndex: 'OIL', textAlign: 'center', textColor: 'rgba(255, 255, 255, 1)', titleColor: 'rgba(255, 255, 255, 1)', titleFontSize: '29px', textFontSize: '29px'},
        {title: 'ACC', dataIndex: 'ACC', textAlign: 'center', textColor: 'rgba(255, 255, 255, 1)', titleColor: 'rgba(255, 255, 255, 1)', titleFontSize: '29px', textFontSize: '29px'},
        {title: 'ASW', dataIndex: 'ASW', textAlign: 'center', textColor: 'rgba(255, 255, 255, 1)', titleColor: 'rgba(255, 255, 255, 1)', titleFontSize: '29px', textFontSize: '29px'}
    ]


    // Stats Table Data
    const dataSrc = [
        {
            LVL: '1',
            HP: shipStats.baseStats.health,
            RLD: shipStats.baseStats.reload,
            LCK: shipStats.baseStats.luck,
            FP: shipStats.baseStats.firepower,
            TRP: shipStats.baseStats.torpedo,
            EVA: shipStats.baseStats.evasion,
            SPD: shipStats.baseStats.speed,
            AA: shipStats.baseStats.antiair,
            AVI: shipStats.baseStats.aviation,
            OIL: shipStats.baseStats.oilConsumption,
            ACC: shipStats.baseStats.accuracy,
            ASW: shipStats.baseStats.antisubmarineWarfare
        },
        {
            LVL: '100',
            HP: shipStats.level100.health,
            RLD: shipStats.level100.reload,
            LCK: shipStats.level100.luck,
            FP: shipStats.level100.firepower,
            TRP: shipStats.level100.torpedo,
            EVA: shipStats.level100.evasion,
            SPD: shipStats.level100.speed,
            AA: shipStats.level100.antiair,
            AVI: shipStats.level100.aviation,
            OIL: shipStats.level100.oilConsumption,
            ACC: shipStats.level100.accuracy,
            ASW: shipStats.level100.antisubmarineWarfare
        },
        {
            LVL: '120',
            HP: shipStats.level120.health,
            RLD: shipStats.level120.reload,
            LCK: shipStats.level120.luck,
            FP: shipStats.level120.firepower,
            TRP: shipStats.level120.torpedo,
            EVA: shipStats.level120.evasion,
            SPD: shipStats.level120.speed,
            AA: shipStats.level120.antiair,
            AVI: shipStats.level120.aviation,
            OIL: shipStats.level120.oilConsumption,
            ACC: shipStats.level120.accuracy,
            ASW: shipStats.level120.antisubmarineWarfare
        },
        {
            LVL: '125',
            HP: shipStats.level125.health,
            RLD: shipStats.level125.reload,
            LCK: shipStats.level125.luck,
            FP: shipStats.level125.firepower,
            TRP: shipStats.level125.torpedo,
            EVA: shipStats.level125.evasion,
            SPD: shipStats.level125.speed,
            AA: shipStats.level125.antiair,
            AVI: shipStats.level125.aviation,
            OIL: shipStats.level125.oilConsumption,
            ACC: shipStats.level125.accuracy,
            ASW: shipStats.level125.antisubmarineWarfare
        }
    ]


    // Retrofit Stats
    if (shipStats.level100Retrofit) {
        dataSrc.push(
            {
                LVL: '100 (Retro)',
                HP: shipStats.level100Retrofit.health,
                RLD: shipStats.level100Retrofit.reload,
                LCK: shipStats.level100Retrofit.luck,
                FP: shipStats.level100Retrofit.firepower,
                TRP: shipStats.level100Retrofit.torpedo,
                EVA: shipStats.level100Retrofit.evasion,
                SPD: shipStats.level100Retrofit.speed,
                AA: shipStats.level100Retrofit.antiair,
                AVI: shipStats.level100Retrofit.aviation,
                OIL: shipStats.level100Retrofit.oilConsumption,
                ACC: shipStats.level100Retrofit.accuracy,
                ASW: shipStats.level100Retrofit.antisubmarineWarfare
            },
            {
                LVL: '120 (Retro)',
                HP: shipStats.level120Retrofit.health,
                RLD: shipStats.level120Retrofit.reload,
                LCK: shipStats.level120Retrofit.luck,
                FP: shipStats.level120Retrofit.firepower,
                TRP: shipStats.level120Retrofit.torpedo,
                EVA: shipStats.level120Retrofit.evasion,
                SPD: shipStats.level120Retrofit.speed,
                AA: shipStats.level120Retrofit.antiair,
                AVI: shipStats.level120Retrofit.aviation,
                OIL: shipStats.level120Retrofit.oilConsumption,
                ACC: shipStats.level120Retrofit.accuracy,
                ASW: shipStats.level120Retrofit.antisubmarineWarfare
            },
            {
                LVL: '125 (Retro)',
                HP: shipStats.level125Retrofit.health,
                RLD: shipStats.level125Retrofit.reload,
                LCK: shipStats.level125Retrofit.luck,
                FP: shipStats.level125Retrofit.firepower,
                TRP: shipStats.level125Retrofit.torpedo,
                EVA: shipStats.level125Retrofit.evasion,
                SPD: shipStats.level125Retrofit.speed,
                AA: shipStats.level125Retrofit.antiair,
                AVI: shipStats.level125Retrofit.aviation,
                OIL: shipStats.level125Retrofit.oilConsumption,
                ACC: shipStats.level125Retrofit.accuracy,
                ASW: shipStats.level125Retrofit.antisubmarineWarfare
            }
        )
    }

     // Generating the table
     const table = new t2c({
        canvas: new Canvas(4, 4),
        columns: columns,
        dataSource: dataSrc,
        bgColor: '#2f3136'
    });


    // Uploading the image + returning the link
    const statsMessage = await (channel as TextChannel).send({files: [new MessageAttachment(table.canvas.toBuffer(), 'image.png')]})
    const statsImage = statsMessage.attachments.first().url

    return statsImage
}