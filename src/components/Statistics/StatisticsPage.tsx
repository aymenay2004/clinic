import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Calendar,
  Download,
  Filter
} from 'lucide-react';

const StatisticsPage: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  // Mock data for charts
  const monthlyData = [
    { name: 'Jan', patients: 65, revenue: 45000 },
    { name: 'Fév', patients: 78, revenue: 52000 },
    { name: 'Mar', patients: 90, revenue: 61000 },
    { name: 'Avr', patients: 81, revenue: 58000 },
    { name: 'Mai', patients: 95, revenue: 67000 },
    { name: 'Jun', patients: 88, revenue: 63000 },
  ];

  const patientTypeData = [
    { name: 'Nouveaux', value: 35, color: '#10B981' },
    { name: 'Anciens', value: 55, color: '#3B82F6' },
    { name: 'Urgences', value: 10, color: '#EF4444' },
  ];

  const serviceData = [
    { name: 'Consultation', count: 120, revenue: 24000 },
    { name: 'Nettoyage', count: 85, revenue: 17000 },
    { name: 'Extraction', count: 45, revenue: 22500 },
    { name: 'Orthodontie', count: 30, revenue: 45000 },
    { name: 'Implant', count: 15, revenue: 37500 },
  ];

  const stats = [
    {
      title: 'Total Patients',
      value: '2,847',
      change: '+12%',
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Revenus ce Mois',
      value: '67,280 MAD',
      change: '+15%',
      icon: DollarSign,
      color: 'green'
    },
    {
      title: 'Rendez-vous',
      value: '324',
      change: '+8%',
      icon: Calendar,
      color: 'purple'
    },
    {
      title: 'Taux de Satisfaction',
      value: '96%',
      change: '+3%',
      icon: TrendingUp,
      color: 'orange'
    }
  ];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Statistiques</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Analysez les performances de votre clinique
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          >
            <option value="week">Cette semaine</option>
            <option value="month">Ce mois</option>
            <option value="quarter">Ce trimestre</option>
            <option value="year">Cette année</option>
          </select>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <Download className="w-5 h-5" />
            <span>Exporter</span>
          </button>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stat.value}</p>
                <p className="text-sm text-green-600 dark:text-green-400 font-medium">{stat.change}</p>
              </div>
              <div className={`w-12 h-12 bg-${stat.color}-100 dark:bg-${stat.color}-900/20 rounded-lg flex items-center justify-center`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-600 dark:text-${stat.color}-400`} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trends */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">Évolution Mensuelle</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: 'none', 
                  borderRadius: '8px',
                  color: '#F9FAFB'
                }} 
              />
              <Line type="monotone" dataKey="patients" stroke="#3B82F6" strokeWidth={3} />
              <Line type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Patient Types */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">Types de Patients</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={patientTypeData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}%`}
              >
                {patientTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Services Performance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">Performance des Services</h3>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={serviceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: 'none', 
                  borderRadius: '8px',
                  color: '#F9FAFB'
                }} 
              />
              <Bar dataKey="count" fill="#3B82F6" name="Nombre" />
              <Bar dataKey="revenue" fill="#10B981" name="Revenus (MAD)" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Detailed Statistics Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">Statistiques Détaillées</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-gray-100">Service</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-gray-100">Patients</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-gray-100">Revenus</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-gray-100">Moyenne</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-gray-100">Évolution</th>
              </tr>
            </thead>
            <tbody>
              {serviceData.map((service, index) => (
                <tr key={service.name} className="border-b border-gray-100 dark:border-gray-700">
                  <td className="py-3 px-4 text-gray-900 dark:text-gray-100">{service.name}</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{service.count}</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{service.revenue.toLocaleString()} MAD</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                    {Math.round(service.revenue / service.count).toLocaleString()} MAD
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-green-600 dark:text-green-400 font-medium">
                      +{Math.floor(Math.random() * 20 + 5)}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default StatisticsPage;