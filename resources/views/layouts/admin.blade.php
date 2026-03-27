<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>{{ config('app.name', 'Pterodactyl') }} - @yield('title')</title>
        <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
        <meta name="_token" content="{{ csrf_token() }}">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png">
        <link rel="icon" type="image/png" href="/favicons/favicon-32x32.png" sizes="32x32">
        <link rel="icon" type="image/png" href="/favicons/favicon-16x16.png" sizes="16x16">
        <link rel="manifest" href="/favicons/manifest.json">
        <link rel="mask-icon" href="/favicons/safari-pinned-tab.svg" color="#bc6e3c">
        <link rel="shortcut icon" href="/favicons/favicon.ico">
        <meta name="msapplication-config" content="/favicons/browserconfig.xml">
        <meta name="theme-color" content="#0e4688">

        {!! Theme::css('vendor/bootstrap/bootstrap.min.css?t={cache-version}') !!}
        {!! Theme::css('vendor/select2/select2.min.css?t={cache-version}') !!}
        {!! Theme::css('vendor/sweetalert/sweetalert.min.css?t={cache-version}') !!}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/ionicons/2.0.1/css/ionicons.min.css">
        @include('layouts.scripts')
    </head>
    <body>
        @php
            $routeName = Route::currentRouteName();
            $navigation = [
                [
                    'label' => 'Basic Administration',
                    'items' => [
                        ['href' => route('admin.index'), 'label' => 'Overview', 'icon' => 'fa-home', 'active' => $routeName === 'admin.index'],
                        ['href' => route('admin.settings'), 'label' => 'Settings', 'icon' => 'fa-wrench', 'active' => \Illuminate\Support\Str::startsWith($routeName, 'admin.settings')],
                        ['href' => route('admin.api.index'), 'label' => 'Application API', 'icon' => 'fa-gamepad', 'active' => \Illuminate\Support\Str::startsWith($routeName, 'admin.api')],
                    ],
                ],
                [
                    'label' => 'Management',
                    'items' => [
                        ['href' => route('admin.databases'), 'label' => 'Databases', 'icon' => 'fa-database', 'active' => \Illuminate\Support\Str::startsWith($routeName, 'admin.databases')],
                        ['href' => route('admin.locations'), 'label' => 'Locations', 'icon' => 'fa-globe', 'active' => \Illuminate\Support\Str::startsWith($routeName, 'admin.locations')],
                        ['href' => route('admin.nodes'), 'label' => 'Nodes', 'icon' => 'fa-sitemap', 'active' => \Illuminate\Support\Str::startsWith($routeName, 'admin.nodes')],
                        ['href' => route('admin.servers'), 'label' => 'Servers', 'icon' => 'fa-server', 'active' => \Illuminate\Support\Str::startsWith($routeName, 'admin.servers')],
                        ['href' => route('admin.users'), 'label' => 'Users', 'icon' => 'fa-users', 'active' => \Illuminate\Support\Str::startsWith($routeName, 'admin.users')],
                    ],
                ],
                [
                    'label' => 'Service Management',
                    'items' => [
                        ['href' => route('admin.mounts'), 'label' => 'Mounts', 'icon' => 'fa-magic', 'active' => \Illuminate\Support\Str::startsWith($routeName, 'admin.mounts')],
                        ['href' => route('admin.nests'), 'label' => 'Nests', 'icon' => 'fa-th-large', 'active' => \Illuminate\Support\Str::startsWith($routeName, 'admin.nests')],
                    ],
                ],
            ];

            $shellData = [
                'accountUrl' => route('account'),
                'appName' => config('app.name', 'Pterodactyl'),
                'avatar' => 'https://www.gravatar.com/avatar/' . md5(strtolower(Auth::user()->email)) . '?s=160',
                'csrfToken' => csrf_token(),
                'currentTitle' => trim($__env->yieldContent('title')) ?: 'Administration',
                'logoutUrl' => route('auth.logout'),
                'navigation' => $navigation,
                'panelUrl' => route('index'),
                'userName' => Auth::user()->name_first . ' ' . Auth::user()->name_last,
            ];
        @endphp

        <div
            id="admin-shell"
            data-admin='@json($shellData)'
        ></div>

        <div id="admin-sources">
            <section id="admin-header-source" class="content-header">
                @yield('content-header')
            </section>
            <section id="admin-flash-source" class="content">
                <div class="row">
                    <div class="col-xs-12">
                        @if (count($errors) > 0)
                            <div class="alert alert-danger">
                                There was an error validating the data provided.<br><br>
                                <ul>
                                    @foreach ($errors->all() as $error)
                                        <li>{{ $error }}</li>
                                    @endforeach
                                </ul>
                            </div>
                        @endif
                        @foreach (Alert::getMessages() as $type => $messages)
                            @foreach ($messages as $message)
                                <div class="alert alert-{{ $type }} alert-dismissable" role="alert">
                                    {{ $message }}
                                </div>
                            @endforeach
                        @endforeach
                    </div>
                </div>
            </section>
            <section id="admin-content-source" class="content">
                @yield('content')
                <footer class="small text-muted" style="margin-top: 24px;">
                    <strong><i class="fa fa-fw {{ $appIsGit ? 'fa-git-square' : 'fa-code-fork' }}"></i></strong> {{ $appVersion }}
                    &nbsp;·&nbsp;
                    <strong><i class="fa fa-fw fa-clock-o"></i></strong> {{ round(microtime(true) - LARAVEL_START, 3) }}s
                </footer>
            </section>
        </div>

        <script src="/js/keyboard.polyfill.js" type="application/javascript"></script>
        <script>keyboardeventKeyPolyfill.polyfill();</script>
        {!! Theme::js('vendor/jquery/jquery.min.js?t={cache-version}') !!}
        {!! Theme::js('vendor/sweetalert/sweetalert.min.js?t={cache-version}') !!}
        {!! Theme::js('vendor/bootstrap/bootstrap.min.js?t={cache-version}') !!}
        {!! Theme::js('vendor/bootstrap-notify/bootstrap-notify.min.js?t={cache-version}') !!}
        {!! Theme::js('vendor/select2/select2.full.min.js?t={cache-version}') !!}
        {!! Theme::js('js/admin/functions.js?t={cache-version}') !!}
        <script src="/js/autocomplete.js" type="application/javascript"></script>
        {!! $asset->js('admin.js') !!}

        @section('footer-scripts')
            <script>
                $(function () {
                    $('[data-toggle="tooltip"]').tooltip();
                });
            </script>
        @show
    </body>
</html>
