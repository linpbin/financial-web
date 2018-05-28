<template>
    <el-row>
        <el-row>
            <el-form ref="form" :inline="true" :model="form" label-width="80px" class="demo-form-inline">
                <el-form-item label="时间范围">
                    <div class="block">
                        <el-date-picker
                                v-model="time"
                                type="datetimerange"
                                :picker-options="pickerOptions2"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                align="right"
                                @change="getTimeValues">
                        </el-date-picker>
                    </div>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="el-icon-search" size="medium" @click="query('form')">搜索
                    </el-button>
                </el-form-item>
            </el-form>
        </el-row>
        <hr/>
        <el-row>
            <el-col :span="12">
                <div id="expendpie" style="width: 500px;height:400px;"></div>
            </el-col>
            <el-col :span="12">
                <div id="expendbar" style="width: 500px;height:400px;"></div>
            </el-col>
        </el-row>
        <hr/>
        <el-row>
            <el-col :span="12">
                <div id="incomepie" style="width: 500px;height:400px;"></div>
            </el-col>
            <el-col :span="12">
                <div id="incomebar" style="width: 500px;height:400px;"></div>
            </el-col>
        </el-row>
    </el-row>

</template>
<script>
    import {
        getincomes,
        getexpends
    } from '../../api/api';
    import ElRow from "element-ui/packages/row/src/row";
    import ElCol from "element-ui/packages/col/src/col";

    var echarts = require('echarts/lib/echarts');
    require('echarts/lib/chart/bar');
    require('echarts/lib/chart/pie');
    export default {
        name: 'Bank',
        data() {
            return {
                pickerOptions2: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                value4: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
                time: '',
                expendpie: {
                    title: {
                        text: '饼图',
                        subtext: '支出',
                        x: 'center'
                    },
                    tooltip: {},
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        data: [],
                    },
                    series: [
                        {
                            name: '消费类型',
                            type: 'pie',
                            radius: '55%',
                            center: ['50%', '50%'],
                            data: [],
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                },
                incomepie: {
                    title: {
                        text: '饼图',
                        subtext: '收入',
                        x: 'center'
                    },
                    tooltip: {},
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        data: [],
                    },
                    series: [
                        {
                            name: '收入类型',
                            type: 'pie',
                            radius: '55%',
                            center: ['50%', '50%'],
                            data: [],
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                },
                expendbar: {
                    title: {
                        text: '柱状图'
                    },
                    tooltip: {},
                    legend: {
                        data: ['支出金额']
                    },
                    xAxis: {
                        data: []
                    },
                    yAxis: {},
                    series: [{
                        name: '支出金额',
                        type: 'bar',
                        data: []
                    }]
                },
                incomebar: {
                    title: {
                        text: '柱状图'
                    },
                    tooltip: {},
                    legend: {
                        data: ['收入金额']
                    },
                    xAxis: {
                        data: []
                    },
                    yAxis: {},
                    series: [{
                        name: '收入金额',
                        type: 'bar',
                        data: []
                    }]
                },
                form: {
                    startTime: '',
                    endTime: '',
                },
            }
        },
        components: {
            ElCol,
            ElRow
        },
        computed: {},
        methods: {
            formatDate(inputTime) {
                var date = new Date(inputTime);
                var y = date.getFullYear();
                var m = date.getMonth() + 1;
                m = m < 10 ? ('0' + m) : m;
                var d = date.getDate();
                d = d < 10 ? ('0' + d) : d;
                var h = date.getHours();
                h = h < 10 ? ('0' + h) : h;
                var minute = date.getMinutes();
                var second = date.getSeconds();
                minute = minute < 10 ? ('0' + minute) : minute;
                second = second < 10 ? ('0' + second) : second;
                return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
            },
            getTimeValues() {
                this.form.startTime = this.formatDate(JSON.parse(JSON.stringify(this.time))[0]);
                this.form.endTime = this.formatDate(JSON.parse(JSON.stringify(this.time))[1]);

            },
            expendPieCharts() {
                var expendlist = sessionStorage.getItem('expendlist');
                var expendtype = JSON.parse(sessionStorage.getItem('expendtype'));
                let legenddata = [];
                for (const index in expendtype) {
                    legenddata.push(expendtype[index].typeName)
                }
                this.expendpie.legend.data = legenddata;
                this.expendpie.series[0].data = JSON.parse(expendlist);
                var myChart = echarts.init(document.getElementById('expendpie'));
                myChart.hideLoading();
                myChart.setOption(this.expendpie);
            },
            expendBarCharts() {
                var expendlist = JSON.parse(sessionStorage.getItem('expendlist'));
                var myChart = echarts.init(document.getElementById('expendbar'));
                let name = [];
                let value = [];
                for (const index in expendlist) {
                    name.push(expendlist[index].name)
                }
                for (const index in expendlist) {
                    value.push(expendlist[index].value)
                }
                myChart.hideLoading();
                myChart.setOption(this.expendbar);
                myChart.setOption({
                    xAxis: {
                        data: name
                    },
                    series: [{
                        name: '支出金额',
                        data: value
                    }]
                })
            },
            incomeBarCharts() {
                var expendlist = JSON.parse(sessionStorage.getItem('incomelist'));
                var myChart = echarts.init(document.getElementById('incomebar'));
                let name = [];
                let value = [];
                for (const index in expendlist) {
                    name.push(expendlist[index].name)
                }
                for (const index in expendlist) {
                    value.push(expendlist[index].value)
                }
                myChart.hideLoading();
                myChart.setOption(this.incomebar);
                myChart.setOption({
                    xAxis: {
                        data: name
                    },
                    series: [{
                        name: '收入金额',
                        data: value
                    }]
                })
            },
            incomePieCharts() {
                var incomelist = sessionStorage.getItem('incomelist');
                var incometype = JSON.parse(sessionStorage.getItem('incometype'));
                let legenddata = [];
                for (const index in incometype) {
                    legenddata.push(incometype[index].typeName)
                }
                this.incomepie.legend.data = legenddata;
                this.incomepie.series[0].data = JSON.parse(incomelist);
                var myChart = echarts.init(document.getElementById('incomepie'));
                myChart.hideLoading();
                myChart.setOption(this.incomepie);
            },
            query(formName) {
                let url = '';
                if (this.form.startTime) {
                    url = url + `&startTime=${this.form.startTime}`
                }
                if (this.form.endTime) {
                    url = url + `&endTime=${this.form.endTime}`
                }
                var userid = sessionStorage.getItem('access-token');
                userid = JSON.parse(userid);
                getincomes(`${userid.id}${url}`).then(data => {
                    this.incomepie.series[0].data = data.data;
                    var myChart = echarts.init(document.getElementById('incomepie'));
                    myChart.hideLoading();
                    myChart.setOption(this.incomepie);

                    var expendlist = data.data
                    var myChart1 = echarts.init(document.getElementById('incomebar'));
                    let name = [];
                    let value = [];
                    for (const index in expendlist) {
                        name.push(expendlist[index].name)
                    }
                    for (const index in expendlist) {
                        value.push(expendlist[index].value)
                    }
                    myChart1.hideLoading();
                    myChart1.setOption(this.incomebar);
                    myChart1.setOption({
                        xAxis: {
                            data: name
                        },
                        series: [{
                            name: '收入金额',
                            data: value
                        }]
                    })

                })
                getexpends(`${userid.id}${url}`).then(data => {
                    this.expendpie.series[0].data = data.data;
                    var myChart = echarts.init(document.getElementById('expendpie'));
                    myChart.hideLoading();
                    myChart.setOption(this.expendpie);

                    var expendlist = data.data
                    var myChart1 = echarts.init(document.getElementById('expendbar'));
                    let name = [];
                    let value = [];
                    for (const index in expendlist) {
                        name.push(expendlist[index].name)
                    }
                    for (const index in expendlist) {
                        value.push(expendlist[index].value)
                    }
                    myChart1.hideLoading();
                    myChart1.setOption(this.expendbar);
                    myChart1.setOption({
                        xAxis: {
                            data: name
                        },
                        series: [{
                            name: '支出金额',
                            data: value
                        }]
                    })
                })

            },
        },
        mounted() {
            this.expendPieCharts()
            this.incomePieCharts()
            this.expendBarCharts()
            this.incomeBarCharts()
        }
    }
</script>
<style>
    .el-row {
        margin-bottom: 2px;

    &
    :last-child {
        margin-bottom: 0;
    }

    }
</style>