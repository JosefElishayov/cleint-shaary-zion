
import * as React from 'react';
import { Select, Space } from 'antd';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, CardActionArea, Container } from '@mui/material';
import { toJewishDate, formatJewishDateInHebrew } from "jewish-date";
import { citiZman } from './objectZman';
export default function Zman() {
    const [ar, setAr] = React.useState({});
    const date = new Date(ar.date);
    const jewishDate = toJewishDate(date);
    const jewishDateInHebrewStr = formatJewishDateInHebrew(jewishDate);
    React.useEffect(() => {
        doApi("jerusalem");
    }, [])
    const doApi = async (_city) => {
        let url = `https://www.hebcal.com/zmanim?cfg=json&city=${_city}&date&M=on`;
        try {
            let resp = await fetch(url);
            let data = await resp.json();
            setAr(data);
        }
        catch (err) {

            console.log(err);
            alert('something wrong come back later');
        }
    }
    const handleChange = (event) => {
        doApi(event);
    };
    return (
        <div className='container'>
            <Card sx={{ maxWidth: "100%" }}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="140"
                        image="https://images.pexels.com/photos/5985971/pexels-photo-5985971.jpeg"
                        alt="green iguana"
                    />
                    <CardContent>
                        <Box sx={{ textAlign: "center" }}>
                            <Typography gutterBottom variant="h5" component="h5">
                                זמני היום
                            </Typography>
                            <Space wrap>
                                <Select
                                    defaultValue={"ירושלים"}
                                    style={{ width: 120, }}
                                    onChange={handleChange}
                                    options={citiZman.map((province) => ({
                                        label: province.Hebrew,
                                        value: province.english,
                                    }))}
                                />
                            </Space>
                            <Typography gutterBottom variant="h6" component="div">
                                {jewishDateInHebrewStr}
                            </Typography>
                        </Box>

                        <Box sx={{ display: "flex", justifyContent: 'space-between' }}>
                            <Typography variant="subtitle2" color="black">
                                {citiZman.map((zman) => (
                                    <>
                                        {zman.nameZman}
                                        <br />
                                    </>
                                ))}
                            </Typography>
                            {ar.times && (
                                <Typography variant="subtitle2" color="text.secondary">
                                    {citiZman.map((zman) => (
                                        <>
                                            {ar.times[zman.zmanTime].slice(11, 16)}
                                            <br />
                                        </>
                                    ))}
                                </Typography>
                            )}
                        </Box>
                    </CardContent>
                </CardActionArea>
            </Card>

        </div>
    );
}