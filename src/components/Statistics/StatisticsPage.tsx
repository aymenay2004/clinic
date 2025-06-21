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
  Line,
  AreaChart,
  Area
} from 'recharts';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Calendar,
  Download,
  Filter,
  Clock,
  Star,
  MapPin,
  Activity
} from 'lucide-react';

const StatisticsPage: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedMetric, setSelectedMetric] = useState('revenue');

  // Mock data for charts with Algerian Dinars
  const monthlyData = [
    { name: 'Jan', patients: 65, revenue: 1450000, appointments: 78, satisfaction: 4.2 },
    { name: 'Fév', patients: 78, revenue: 1720000, appointments: 89, satisfaction: 4.3 },
    { name: 'Mar', patients: 90, revenue: 2010000, appointments: 102, satisfaction: 4.5 },
    { name: 'Avr', patients: 81, revenue: 1890000, appointments: 95, satisfaction: 4.4 },
    { name: 'Mai', patients: 95, revenue: 2250000, appointments: 108, satisfaction: 4.6 },
    { name: 'Jun', patients: 88, revenue: 2080000, appointments: 98, satisfaction: 4.5 },
  ];

  const patientTypeData = [
    { name: 'Nouveaux', value: 35, color: '#10B981', count: 847 },
    { name: 'Anciens', value: 55, color: '#3B82F6', count: 1334 },
    { name: 'Urgences', value: 10, color: '#EF4444', count: 242 },
  ];

  const serviceData = [
    { name: 'Consultation', count: 120, revenue: 420000, avgPrice: 3500, duration: 30 },
    { name: 'Nettoyage', count: 85, revenue: 212500, avgPrice: 2500, duration: 45 },
    { name: 'Extraction', count: 45, revenue: 225000, avgPrice: 5000, duration: 60 },
    { name: 'Orthodontie', count: 30, revenue: 1350000, avgPrice: 45000, duration: 90 },
    { name: 'Implant', count: 15, revenue: 1125000, avgPrice: 75000, duration: 120 },
    { name: 'Blanchiment', count: 25, revenue: 375000, avgPrice: 15000, duration: 90 },
  ];

  const cityData = [
    { name: 'Alger', patients: 1247, revenue: 4250000 },
    { name: 'Oran', patients: 856, revenue: 2890000 },
    { name: 'Constantine', patients: 634, revenue: 2150000 },
    { name: 'Annaba', patients: 423, revenue: 1430000 },
    { name: 'Blida', patients: 387, revenue: 1310000 },
    { name: 'Autres', patients: 298, revenue: 1010000 },
  ];

  const doctorPerformance = [
    { name: 'Dr. Benali', patients: 156, revenue: 1890000, rating: 4.8, hours: 180 },
    { name: 'Dr. Alami', patients: 134, revenue: 1650000, rating: 4.6, hours: 165 },
    { name: 'Dr. Zahra', patients: 128, revenue: 1580000, rating: 4.7, hours: 158 },
    { name: 'Dr. Hassani', patients: 98, revenue: 1240000, rating: 4.5, hours: 142 },
  ];

  const timeSlotData = [
    { time: '08:00', appointments: 12, efficiency: 85 },
    { time: '09:00', appointments: 18, efficiency: 92 },
    { time: '10:00', appointments: 22, efficiency: 88 },
    { time: '11:00', appointments: 20, efficiency: 90 },
    { time: '14:00', appointments: 25, efficiency: 95 },
    { time: '15:00', appointments: 23, efficiency: 87 },
    { time: '16:00', appointments: 19, efficiency: 83 },
    { time: '17:00', appointments: 15, efficiency: 78 },
  ];

  const stats = [
    {
      title: 'Total Patients',
      value: '2,847',
      change: '+12%',
      icon: Users,
      color: 'blue',
      subtext: 'Ce mois'
    },
    {
      title: 'Revenus Totaux',
      value: '2,250,000 DA',
      change: '+15%',
      icon: DollarSign,
      color: 'green',
      subtext: 'Ce mois'
    },
    {
      title: 'Rendez-vous',
      value: '324',
      change: '+8%',
      icon: Calendar,
      color: 'purple',
      subtext: 'Cette semaine'
    },
    {
      title: 'Satisfaction',
      value: '4.6/5',
      change: '+3%',
      icon: Star,
      color: 'orange',
      subtext: 'Note moyenne'
    },
    {
      title: 'Temps Moyen',
      value: '42 min',
      change: '-5%',
      icon: Clock,
      color: 'indigo',
      subtext: 'Par consultation'
    },
    {
      title: 'Taux Présence',
      value: '87%',
      change: '+2%',
      icon: Activity,
      color: 'pink',
      subtext: 'Rendez-vous honorés'
    }
  ];

  const formatCurrency = (value: number) => {
    return `${value.toLocaleString()} DA`;
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Statistiques Avancées</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Analysez les performances détaillées de votre clinique
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
            <option value="custom">Période personnalisée</option>
          </select>
          <select
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e.target.value)}
            className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          >
            <option value="revenue">Revenus</option>
            <option value="patients">Patients</option>
            <option value="appointments">Rendez-vous</option>
            <option value="satisfaction">Satisfaction</option>
          </select>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <Download className="w-5 h-5" />
            <span>Exporter PDF</span>
          </button>
        </div>
      </motion.div>

      {/* Enhanced Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 bg-${stat.color}-100 dark:bg-${stat.color}-900/20 rounded-lg flex items-center justify-center`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-600 dark:text-${stat.color}-400`} />
              </div>
              <span className={`text-sm font-medium ${stat.change.startsWith('+') ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                {stat.change}
              </span>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">{stat.value}</p>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">{stat.title}</p>
              <p className="text-xs text-gray-500 dark:text-gray-500">{stat.subtext}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Trend Analysis */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">Évolution Mensuelle</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={monthlyData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="colorPatients" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
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
                formatter={(value, name) => [
                  name === 'revenue' ? formatCurrency(value as number) : value,
                  name === 'revenue' ? 'Revenus' : name === 'patients' ? 'Patients' : name
                ]}
              />
              <Area type="monotone" dataKey="revenue" stroke="#3B82F6" fillOpacity={1} fill="url(#colorRevenue)" />
              <Area type="monotone" dataKey="patients" stroke="#10B981" fillOpacity={1} fill="url(#colorPatients)" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Patient Distribution */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">Répartition des Patients</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={patientTypeData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label={({ name, value, count }) => `${name}: ${value}% (${count})`}
              >
                {patientTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value, name) => [`${value}%`, name]} />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Service Performance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
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
              formatter={(value, name) => [
                name === 'revenue' ? formatCurrency(value as number) : 
                name === 'avgPrice' ? formatCurrency(value as number) : value,
                name === 'count' ? 'Nombre' : 
                name === 'revenue' ? 'Revenus' : 
                name === 'avgPrice' ? 'Prix Moyen' : 
                name === 'duration' ? 'Durée (min)' : name
              ]}
            />
            <Bar dataKey="count" fill="#3B82F6" name="count" />
            <Bar dataKey="revenue" fill="#10B981" name="revenue" />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Geographic and Doctor Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Geographic Distribution */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">Répartition Géographique</h3>
          <div className="space-y-4">
            {cityData.map((city, index) => (
              <div key={city.name} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-gray-100">{city.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{city.patients} patients</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900 dark:text-gray-100">{formatCurrency(city.revenue)}</p>
                  <div className="w-24 bg-gray-200 dark:bg-gray-600 rounded-full h-2 mt-1">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${(city.patients / Math.max(...cityData.map(c => c.patients))) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Doctor Performance */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">Performance des Docteurs</h3>
          <div className="space-y-4">
            {doctorPerformance.map((doctor, index) => (
              <div key={doctor.name} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-gray-900 dark:text-gray-100">{doctor.name}</h4>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{doctor.rating}</span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600 dark:text-gray-400">Patients</p>
                    <p className="font-semibold text-gray-900 dark:text-gray-100">{doctor.patients}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-400">Revenus</p>
                    <p className="font-semibold text-gray-900 dark:text-gray-100">{formatCurrency(doctor.revenue)}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-400">Heures</p>
                    <p className="font-semibold text-gray-900 dark:text-gray-100">{doctor.hours}h</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Time Slot Analysis */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">Analyse des Créneaux Horaires</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={timeSlotData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="time" stroke="#6B7280" />
            <YAxis stroke="#6B7280" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1F2937', 
                border: 'none', 
                borderRadius: '8px',
                color: '#F9FAFB'
              }} 
            />
            <Line type="monotone" dataKey="appointments" stroke="#3B82F6" strokeWidth={3} name="Rendez-vous" />
            <Line type="monotone" dataKey="efficiency" stroke="#10B981" strokeWidth={3} name="Efficacité %" />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Detailed Statistics Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">Statistiques Détaillées par Service</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-gray-100">Service</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-gray-100">Patients</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-gray-100">Revenus</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-gray-100">Prix Moyen</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-gray-100">Durée Moy.</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-gray-100">Évolution</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-gray-100">Part de Marché</th>
              </tr>
            </thead>
            <tbody>
              {serviceData.map((service, index) => {
                const totalRevenue = serviceData.reduce((sum, s) => sum + s.revenue, 0);
                const marketShare = ((service.revenue / totalRevenue) * 100).toFixed(1);
                return (
                  <tr key={service.name} className="border-b border-gray-100 dark:border-gray-700">
                    <td className="py-3 px-4 text-gray-900 dark:text-gray-100 font-medium">{service.name}</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{service.count}</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{formatCurrency(service.revenue)}</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{formatCurrency(service.avgPrice)}</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{service.duration} min</td>
                    <td className="py-3 px-4">
                      <span className="text-green-600 dark:text-green-400 font-medium">
                        +{Math.floor(Math.random() * 20 + 5)}%
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${marketShare}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">{marketShare}%</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default StatisticsPage;